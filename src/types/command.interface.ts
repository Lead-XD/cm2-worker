import {CommandExecStatus} from "../constants/command.constants";
import mongoose from "mongoose";
import { ExecutedCommandDocument } from "../models/ExecutedCommand";
import { workTriggerType } from "../constants/logs.constants";
import { AsanaEventDocument } from "../models/AsanaEvent.model";


export type  ExecutedCommandDocumentType = {
    command:mongoose.Types.ObjectId,
    priority:number,
    jobID:string,
    triggerEvent:mongoose.Types.ObjectId,
    organization:mongoose.Types.ObjectId,
    execStatus:CommandExecStatus,
    project:mongoose.Types.ObjectId,
    exception:mongoose.Types.ObjectId,
}


export type CommandContext =  {
    jobName:string,
    organizationId: mongoose.Schema.Types.ObjectId,
    commandId: mongoose.Schema.Types.ObjectId,
    projectObj:Object,
    eventObj: AsanaEventDocument,
    triggerData: {
        triggerObj: ExecutedCommandDocument,
        type: workTriggerType
    },
    workerId: mongoose.Schema.Types.ObjectId,
}
export type CommandExecutionData = {
    taskGID:string,
    resource:Object,
}