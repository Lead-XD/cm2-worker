export const commandQueueName = process.env.REDIS_COMMAND_QUEUE as string;

export enum CommandStatus {
    active= 'active',
    inactive= 'inactive',
}

export enum CommandExecStatus {
    processing="PROCESSING",
    scheduled="SCHEDULED",
    queued="QUEUED",
    failed ="FAILED",
    completed="COMPLETED",
}