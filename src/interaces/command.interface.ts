import {CommandExecStatus, CommandStatus} from "../constants/command.constants";
import mongoose from "mongoose";
import { ExecutedCommandDocument } from "../models/ExecutedCommand.model";
import { AsanaEventDocument } from "../models/AsanaEvent.model";
import {EventFilterDocument} from "../models/EventFilter.model";
import {WorkerDocument} from "../models/Worker.model";
import {ProjectDocument} from "../models/Project.model";
import {AsanaTaskDocument} from "../models/AsanaTask.model";


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


export interface CommandContext  {
    jobName:string,
    organizationId: mongoose.Types.ObjectId,
    commandId: mongoose.Types.ObjectId,
    projectDocument:ProjectDocument,
    eventDocument: AsanaEventDocument,
    executedCommandDocument:ExecutedCommandDocument
    workerId: mongoose.Types.ObjectId,
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
    eventFilter: mongoose.Types.ObjectId | EventFilterDocument,
    default: boolean,
    worker: mongoose.Types.ObjectId | WorkerDocument,
}


export interface WorkerDocumentInterface {
    name: string,
    description: string,
    queueName: string,
    jwt: string,
}