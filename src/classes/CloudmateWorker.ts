import {WorkFunction} from "../interaces/worker.interface";
import Redis from "ioredis";
import * as os from "os";
import {Job, Worker} from "bullmq";
import ExecutedCommand, {
    ExecutedCommandDocument
} from "../models/ExecutedCommand.model";
import {
    CommandContext,
    CommandExecutionData
} from "../interaces/command.interface";
import {CommandExecStatus} from "../constants/command.constants";
import {CloudmateException} from "./CloudmateException";
import {Cloudmate2API} from "./Cloumdate2API";
import connectToMongoDB from "../config/database.config";
import Project, {ProjectDocument} from "../models/Project.model";
import AsanaEvent, {AsanaEventDocument} from "../models/AsanaEvent.model";
import AsanaTask, {AsanaTaskDocument} from "../models/AsanaTask.model";
import {JobData} from "../interaces/general.interface";
import {workTriggerType} from "../constants/logs.constants";

export class CloudmateWorker {
    private registeredJobs: Map<string, WorkFunction> = new Map();
    private readonly redisConnection: Redis;
    private readonly queueName: string;
    private readonly workerJWT: string;
    private cm2DBURL: string;

    constructor(queueName: string, workerJWT: string, cm2DBURL: string, redisURL: string) {
        this.queueName = queueName;
        this.workerJWT = workerJWT;
        this.cm2DBURL = cm2DBURL;
        this.redisConnection = new Redis(redisURL);
    }

    register(jobName: string, work: WorkFunction) {
        this.registeredJobs.set(jobName, work);
    }

    initiate() {
        const systemCpuCores = os.cpus();
        connectToMongoDB(this.cm2DBURL).then(() => {
            const bullmqWorker = new Worker(this.queueName, async (job: Job) => {
                console.log(`[${new Date().toLocaleString()}] Processing Job: ${job.name}.`);


                const data = job.data as JobData;
                const executedCommandDocument: ExecutedCommandDocument = new ExecutedCommand(data.executedCommandDocument);
                executedCommandDocument.isNew = false;

                const projectDocument: ProjectDocument = new Project(data.projectDocument);
                projectDocument.isNew = false;

                const asanaEventDocument: AsanaEventDocument = new AsanaEvent(data.eventDocument);
                asanaEventDocument.isNew = false;

                const asanaTaskDocument: AsanaTaskDocument = new AsanaTask(data.asanaTaskDocument);
                asanaTaskDocument.isNew = false;


                const commandCTX: CommandContext = {
                    organizationId: data.organizationId,
                    commandId: data.commandId,
                    projectDocument: projectDocument,
                    eventDocument: asanaEventDocument,
                    trigger:{
                        triggerDocument: executedCommandDocument,
                        triggerType: workTriggerType.command
                    },
                    workerId: data.workerId,
                    jobName: job.name,
                }
                const commandExecutionData: CommandExecutionData = {
                    asanaTaskDocument: asanaTaskDocument,
                    resource: data.resource,
                }
                const workFunction = this.registeredJobs.get(job.name);
                if (workFunction) {
                    await workFunction(commandCTX, commandExecutionData);
                }

            }, {
                connection: this.redisConnection,
                concurrency: systemCpuCores.length
            });

            bullmqWorker.on('completed', async (job: Job) => {
                const data = job.data as JobData;
                const executedCommandDocument: ExecutedCommandDocument = new ExecutedCommand(data.executedCommandDocument);
                executedCommandDocument.isNew = false;
                executedCommandDocument.set("execStatus", CommandExecStatus.completed);
                await executedCommandDocument.save();
            });

            bullmqWorker.on('failed', async (job, e) => {
                console.log(e);
                if (job && e instanceof CloudmateException) {
                    const data = job.data as JobData;
                    const executedCommandDocument: ExecutedCommandDocument = new ExecutedCommand(data.executedCommandDocument);
                    executedCommandDocument.isNew = false;
                    executedCommandDocument.set("execStatus", CommandExecStatus.failed);
                    await executedCommandDocument.save();
                    const cm2Client = new Cloudmate2API(this.workerJWT, data.organizationId);
                    await cm2Client.createException(e, executedCommandDocument._id, e.sourceTaskGID, e.parentTaskGID, true);
                }
            });
        });
    }
}