import { WorkFunction } from "../types/worker.interface";
import Redis from "ioredis";
import os from "os";
import { Worker, Job } from "bullmq";
import ExecutedCommand, { ExecutedCommandDocument } from "../models/ExecutedCommand";
import { CommandContext, CommandExecutionData } from "../types/command.interface";
import { workTriggerType } from "../constants/logs.constants";
import { CommandExecStatus } from "../constants/command.constants";
import { CloudmateException } from "./CloudmateException";
import { Cloudmate2API } from "./Cloumdate2API";
import connectToMongoDB from "../config/database.config";

export class CloudmateWorker {
    private registeredJobs: Map<string, WorkFunction> = new Map();
    private redisConnection: Redis;
    private queueName: string;
    private workerJWT: string;
    private cm2DBURL: string;

    constructor(queueName: string, workerJWT: string, cm2DBURL: string, redisURL: string);
    constructor(
        queueName: string,
        workerJWT: string,
        CM2DB: string,
        redisPort: number,
        redisHost: string,
        redisPassword?: string,
        redisUsername?: string
    )
    constructor(queueName: string, workerJWT: string, cm2DBURL: string, arg4: unknown, redisHost?: string, redisPassword?: string, redisUsername?: string) {
        this.queueName = queueName;
        this.workerJWT = workerJWT;
        this.cm2DBURL = cm2DBURL;
        if (arg4 instanceof String || typeof arg4 === "string") {
            this.redisConnection = new Redis(arg4 as string);

        } else if (arg4 instanceof Number || typeof arg4 === "number") {
            this.redisConnection = new Redis(arg4 as number, redisHost!, {
                password: redisPassword,
                username: redisUsername,
            });
        } else {
            throw new Error("Invalid arguments");
        }
    }

    register(jobName: string, work: WorkFunction) {
        this.registeredJobs.set(jobName, work);
    }
    initiate() {
        const systemCpuCores = os.cpus();
        connectToMongoDB(this.cm2DBURL).then(() => {
            const bullmqWorker = new Worker(this.queueName, async (job: Job) => {
                console.log(`Processing Job: ${job.name}`);
                const executedCommandDocument: ExecutedCommandDocument = new ExecutedCommand(job.data.queueData.executedCommandObj);
                executedCommandDocument.isNew = false;
                const commandCTX: CommandContext = {
                    organizationId: job.data.queueData.organizationId,
                    commandId: job.data.queueData.commandId,
                    projectObj: job.data.queueData.projectObj,
                    eventObj: job.data.queueData.eventObj,
                    triggerData: {
                        triggerObj: executedCommandDocument,
                        type: workTriggerType.command
                    },
                    workerId: job.data.queueData.workerId,
                    jobName: job.name,
                }
                const commandExecutionData: CommandExecutionData = {
                    taskGID: job.data.queueData.taskGID,
                    resource: job.data.queueData.resource,
                }
                const workFunction = this.registeredJobs.get(job.name);
                if (workFunction) {
                    await workFunction(commandCTX, commandExecutionData);
                }

            }, { connection: this.redisConnection, concurrency: systemCpuCores.length });

            bullmqWorker.on('completed', async (job: Job) => {
                const executedCommandDocument: ExecutedCommandDocument = new ExecutedCommand(job.data.queueData.executedCommandObj);
                executedCommandDocument.isNew = false;
                executedCommandDocument.set("execStatus", CommandExecStatus.completed);
                await executedCommandDocument.save();
            });

            bullmqWorker.on('failed', async (job, e) => {
                console.log(e);
                if (job && e instanceof CloudmateException) {
                    const executedCommandDocument: ExecutedCommandDocument = new ExecutedCommand(job.data.queueData.executedCommandObj);
                    executedCommandDocument.isNew = false;
                    executedCommandDocument.set("execStatus", CommandExecStatus.failed);
                    await executedCommandDocument.save();
                    if (e instanceof CloudmateException) {
                        const cm2Client = new Cloudmate2API(this.workerJWT, job.data.queueData.organizationId);
                        await cm2Client.createException(e, executedCommandDocument._id, e.sourceTaskGID, e.parentTaskGID, true);
                    }
                }
            });
        });
    }
}