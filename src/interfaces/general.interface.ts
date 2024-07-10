import mongoose from "mongoose";
import {ProjectDocument} from "../models/Project.model";
import {AsanaTaskDocument} from "../models/AsanaTask.model";
import {AsanaEventDocument} from "../models/AsanaEvent.model";
import {ExecutedCommandDocument} from "../models/ExecutedCommand.model";
import {workTriggerType} from "../constants/logs.constants";
import {UserDocumentInterface} from "./user.interface";
import {AsanaUserDocument} from "../models/AsanaUser.model";

export interface JobData {
    commandId: mongoose.Types.ObjectId,
    organizationId: mongoose.Types.ObjectId,
    appId: mongoose.Types.ObjectId,
    workspaceGID: string,
    projectDocument: ProjectDocument,
    asanaTaskDocument: AsanaTaskDocument,
    eventDocument: AsanaEventDocument,
    executedCommandDocument: ExecutedCommandDocument,
    resource: any,
    workerId: mongoose.Types.ObjectId,
    cloudmateUser:UserDocumentInterface,
    ownerUser:UserDocumentInterface,
    configurationsInstance:any,
    asanaUserDocument?:AsanaUserDocument
}

export interface Context {
     triggerDocument:ExecutedCommandDocument,
     triggerType:workTriggerType
}