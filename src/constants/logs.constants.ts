export enum jobsForLogsWorker {
    log="log",
}

export enum workTriggerType {
    command= "command",
    trpc= "trpc"
}

export enum workType {
    api= "api",
    function= "function",
}

export enum workExecStatus {
    completed= "completed",
    failed= "failed",
    processing= "processing",
}