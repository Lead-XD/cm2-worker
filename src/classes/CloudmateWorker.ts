import {WorkFunction} from "../interfaces/worker.interface";
import Redis from "ioredis";
import * as os from "os";
import {Job, Queue, Worker} from "bullmq";
import {
    CommandContext,
    CommandExecutionData
} from "../interfaces/command.interface";
import {CommandExecStatus} from "../constants/command.constants";
import {CloudmateException} from "./CloudmateException";
import {Cloudmate2API} from "./Cloudmate2API";
import Project, {ProjectDocument} from "../models/Project.model";
import AsanaEvent, {AsanaEventDocument} from "../models/AsanaEvent.model";
import AsanaTask, {AsanaTaskDocument} from "../models/AsanaTask.model";
import ExecutedCommand, {
    ExecutedCommandDocument
} from "../models/ExecutedCommand.model";
import {JobData} from "../interfaces/general.interface";
import {workTriggerType} from "../constants/logs.constants";
import {CloudmateLogger} from "./CloudmateLogger";
import TypeFormEvent, {
    TypeFormEventDocument
} from "../models/TypeFormEvent.model";
import {EventSources} from "../constants/constants";
import {closeDBConnection} from "../config/database.config";


export class CloudmateWorker {
    private registeredJobs: Map<string, WorkFunction> = new Map();
    private readonly redisConnection: Redis;
    private readonly queueName: string;
    private readonly workerJWT: string;
    public static logQueue: Queue;
    private bullmqWorker: Worker | undefined;

    constructor(queueName: string, workerJWT: string, redisURL: string) {
        this.queueName = queueName;
        this.workerJWT = workerJWT;
        this.redisConnection = new Redis(redisURL);
    }

    register(jobName: string, work: WorkFunction) {
        this.registeredJobs.set(jobName, work);
    }

    initiate() {
        CloudmateWorker.logQueue = new Queue('cm_log_queue', {connection: this.redisConnection});

        const systemCpuCores = os.cpus();

        this.bullmqWorker = new Worker(this.queueName, async (job: Job) => {
            console.log(`[${new Date().toLocaleString()}] Processing Job: ${job.name}.`);

            const data = job.data as JobData;
            const executedCommandDocument: ExecutedCommandDocument = new ExecutedCommand(data.executedCommandDocument);
            executedCommandDocument.isNew = false;

            const projectDocument: ProjectDocument = new Project(data.projectDocument);
            projectDocument.isNew = false;

            let eventDocument: AsanaEventDocument | TypeFormEventDocument;
            if (data.eventDocument.cm.source === EventSources.asana) {
                eventDocument = new AsanaEvent(data.eventDocument);
            } else if (data.eventDocument.cm.source === EventSources.typeform) {
                eventDocument = new TypeFormEvent(data.eventDocument);
            } else {
                return;
            }
            eventDocument.isNew = false;

            const asanaTaskDocument: AsanaTaskDocument = new AsanaTask(data.asanaTaskDocument);
            asanaTaskDocument.isNew = false;
            const cloudmateLogger = new CloudmateLogger(executedCommandDocument._id);
            const commandCTX: CommandContext = {
                organizationId: data.organizationId,
                commandId: data.commandId,
                workspaceGID: data.workspaceGID,
                appId: data.appId,
                projectDocument: projectDocument,
                eventDocument: eventDocument,
                trigger: {
                    triggerDocument: executedCommandDocument!,
                    triggerType: workTriggerType.command
                },
                workerId: data.workerId,
                jobName: job.name,
                cloudmateLogger: cloudmateLogger,
                cloudmateUser: data.cloudmateUser,
                ownerUser: data.ownerUser,
                configurationsInstance: data.configurationsInstance,
                asanaUserDocument: data.asanaUserDocument
            }
            const commandExecutionData: CommandExecutionData = {
                asanaTaskDocument: asanaTaskDocument,
                resource: data.resource,
            }

            const workFunction = this.registeredJobs.get(job.name);
            if (workFunction) {
                //Do not remove the await from the following line!!!!!
                await workFunction(commandCTX, commandExecutionData);
            }

        }, {
            connection: this.redisConnection,
            concurrency: systemCpuCores.length
        });

        this.bullmqWorker.on('completed', async (job: Job) => {
            console.log(`Job Completed ${job?.name},${job?.id}`)
            const data = job.data as JobData;
            const executedCommandDocument: ExecutedCommandDocument = new ExecutedCommand(data.executedCommandDocument);
            executedCommandDocument.isNew = false;
            executedCommandDocument.set("execStatus", CommandExecStatus.completed);
            await executedCommandDocument.save();
        });

        this.bullmqWorker.on('failed', async (job, e) => {
            console.log(`Job Failed ${job?.name},${job?.id}`)
            if (job && e instanceof CloudmateException) {
                const data = job.data as JobData;
                const executedCommandDocument: ExecutedCommandDocument = new ExecutedCommand(data.executedCommandDocument);
                executedCommandDocument.isNew = false;
                executedCommandDocument.set("execStatus", CommandExecStatus.failed);
                await executedCommandDocument.save();
                const cm2Client = new Cloudmate2API(this.workerJWT, data.organizationId);
                try {
                    await cm2Client.createException(e, executedCommandDocument._id, e.sourceTaskGID, e.parentTaskGID, e.useSimone, e.uncompleteSourceTask, e.throwInAsana);
                } catch (e) {
                    console.log(e);
                    console.log("Error occurred while creating exception");
                    console.log(`Error message ${e.message}`);
                    console.log(`Error description ${e.description}`);
                    console.log(`Error data ${e.data}`);
                }

            }
        });
    }

    public async shutdown() {
        console.log('Graceful shutdown initiated...');
        if (this.bullmqWorker) {
            await this.bullmqWorker.close();
            console.log('Worker closed.');
        }
        await this.redisConnection.quit();
        console.log('Redis connection closed.');
        console.log('SIGTERM received. Closing MongoDB connections...');
        await closeDBConnection();
        process.exit(0);
    }

}