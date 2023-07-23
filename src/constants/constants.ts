export enum AsanaEventSources{
    token="token",
    asana="asana"
}

export const logQueueName = process.env.REDIS_LOG_QUEUE as string;
