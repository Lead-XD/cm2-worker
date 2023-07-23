export enum AsanaEventSources{
    token="token",
    asana="asana"
}

export const logQueueName = process.env.REDIS_LOG_QUEUE as string;
export const isRequired = " is Required";   
export enum organizationAppTypes {
    asana ="ASANA",
    microsoft = "MICROSOFT",
    google = "GOOGLE",
}
