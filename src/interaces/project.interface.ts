import mongoose from "mongoose";
import {ProjectTypes} from "../constants/project.constants";
import {organizationAppTypes} from "../constants/constants";
import {ChannelDetails} from "./channel.interface";
import {VariableTypes} from "../constants/variable.constants";
import {CommandDocument} from "../models/Command.model";
import {CommandStatus} from "../constants/command.constants";


export interface ProjectVariable {
    id: mongoose.Types.ObjectId,
    type: VariableTypes,
}

export interface ProjectDocumentInterface {
    app: mongoose.Types.ObjectId;
    workspaceGID: string;
    projectGID: string;
    teamGID: string;
    teamName: string;
    name: string;
    webhookSecret: {
        [organizationAppTypes.asana]: string,
    };
    projectType: ProjectTypes;
    messageDetails: ChannelDetails;
    variables: ProjectVariable[];
    commands: {
        id: mongoose.Types.ObjectId | CommandDocument,
        status: CommandStatus,
    }[]
}