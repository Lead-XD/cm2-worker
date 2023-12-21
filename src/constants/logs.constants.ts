import clc from "cli-color";

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

export enum logLevels {
    error = "error",
    warn = "warn",
    info = "info",
    http = "http",
    verbose = "verbose",
    debug = "debug",
    silly = "silly",
}

export const colors:any = {
    error: clc.red,
    warn: clc.yellow,
    info: clc.green,
    debug: clc.blue,
};
