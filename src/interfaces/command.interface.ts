import {CommandExecStatus, CommandStatus} from "../constants/command.constants";
import mongoose from "mongoose";
import {EventFilterDocument} from "../models/EventFilter.model";
import { ExecutedCommandDocument } from "../models/ExecutedCommand";
import { workTriggerType } from "../constants/logs.constants";
import { AsanaEventDocument } from "../models/AsanaEvent.model";

export interface CommandDocumentInterface {
    name:string,
    description:string,
    work:string,
    status:CommandStatus,
    priority:number,
    eventFilter:mongoose.Types.ObjectId|EventFilterDocument,
    default:boolean,
}

export interface ExecutedCommandDocumentInterface {
    command:mongoose.Types.ObjectId,
    priority:number,
    jobID:string,
    triggerEvent:mongoose.Types.ObjectId,
    organization:mongoose.Types.ObjectId,
    execStatus:CommandExecStatus,
    project:mongoose.Types.ObjectId,
    exception:mongoose.Types.ObjectId,
}

export interface CommandContext {
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
export interface CommandExecutionData{
    taskGID:string,
    resource:Object,
}