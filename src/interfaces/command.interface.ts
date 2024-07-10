import {CommandExecStatus, CommandStatus} from "../constants/command.constants";
import mongoose from "mongoose";
import { ExecutedCommandDocument } from "../models/ExecutedCommand.model";
import { AsanaEventDocument } from "../models/AsanaEvent.model";
import {EventFilterDocument} from "../models/EventFilter.model";
import {WorkerDocument} from "../models/Worker.model";
import {ProjectDocument} from "../models/Project.model";
import {AsanaTaskDocument} from "../models/AsanaTask.model";
import {workTriggerType} from "../constants/logs.constants";
import {CloudmateLogger} from "../classes/CloudmateLogger";
import {UserDocumentInterface} from "./user.interface";
import {AsanaUserDocument} from "../models/AsanaUser.model";


export interface  ExecutedCommandDocumentType {
    command:mongoose.Types.ObjectId,
    priority:number,
    jobID:string,
    triggerEvent:mongoose.Types.ObjectId,
    organization:mongoose.Types.ObjectId,
    execStatus:CommandExecStatus,
    project:mongoose.Types.ObjectId,
    exception:mongoose.Types.ObjectId,
}

export interface TriggerContext{
    triggerDocument:ExecutedCommandDocument,
    triggerType:workTriggerType
}

export interface CommandContext  {
    jobName:string,
    organizationId: mongoose.Types.ObjectId,
    commandId: mongoose.Types.ObjectId,
    projectDocument:ProjectDocument,
    eventDocument: AsanaEventDocument,
    trigger:TriggerContext,
    workerId: mongoose.Types.ObjectId,
    appId: mongoose.Types.ObjectId,
    workspaceGID: string,
    cloudmateLogger:CloudmateLogger,
    cloudmateUser:UserDocumentInterface,
    ownerUser:UserDocumentInterface,
    configurationsInstance:any,
    asanaUserDocument?:AsanaUserDocument
}
export interface CommandExecutionData {
    asanaTaskDocument:AsanaTaskDocument,
    resource:Object,
}

export interface CommandDocumentInterface {
    name: string,
    description: string,
    work: string,
    status: CommandStatus,
    priority: number,
    eventFilters: mongoose.Schema.Types.ObjectId[] | EventFilterDocument[],
    default: boolean,
    inheritToChildren:boolean,
    worker: mongoose.Types.ObjectId | WorkerDocument,
    configurationsTemplate?: any
}


export interface WorkerDocumentInterface {
    name: string,
    description: string,
    queueName: string,
    jwt: string,
}