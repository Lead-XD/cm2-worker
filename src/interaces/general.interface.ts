import mongoose from "mongoose";
import {ProjectDocument} from "../models/Project.model";
import {AsanaTaskDocument} from "../models/AsanaTask.model";
import {AsanaEventDocument} from "../models/AsanaEvent.model";
import {ExecutedCommandDocument} from "../models/ExecutedCommand.model";

export interface JobData {
    commandId: mongoose.Types.ObjectId,
    organizationId: mongoose.Types.ObjectId,
    projectDocument: ProjectDocument,
    asanaTaskDocument: AsanaTaskDocument,
    eventDocument: AsanaEventDocument,
    executedCommandDocument: ExecutedCommandDocument,
    resource: any,
    workerId: mongoose.Types.ObjectId,
}