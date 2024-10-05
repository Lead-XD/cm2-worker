import mongoose from "mongoose";
import {ProjectTypes} from "../constants/project.constants";
import {organizationAppTypes} from "../constants/constants";
import {ChannelDetails} from "./channel.interface";
import {VariableTypes} from "../constants/variable.constants";
import {CommandDocument} from "../models/Command.model";
import {CommandStatus} from "../constants/command.constants";
import {AsanaResourceInterface} from "./asana.interface";
import {CustomField} from "./asanaTask.interface";
import {AsanaResourceTypes} from "../constants/asana.constants";


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
        configurationsInstance?: any,
        projectFilters?:[any]
    }[],
    resourceType: AsanaResourceTypes;
    archived: boolean;
    color: string;
    createdAt: Date;
    defaultView: string;
    dueDate: Date;
    dueOn: Date;
    htmlNotes: string;
    members:[AsanaResourceInterface];
    modifiedAt: Date;
    notes: string;
    public: boolean;
    startOn: Date;
    customFields:[CustomField];
    completed: boolean;
    completedAt: Date;
    completedBy: AsanaResourceInterface;
    followers: [AsanaResourceInterface];
    owner: AsanaResourceInterface;
    icon: string;
    permalinkUrl: string;
    createdFromTemplate: AsanaResourceInterface;
}


export interface AsanaProjectDocumentInterface {
    app: mongoose.Types.ObjectId;
    workspaceGID: string;
    gid: string;
    team: {
        gid: string,
        resourceType: AsanaResourceTypes,
        name: string,
    },
    name: string;
    resourceType: AsanaResourceTypes;
    archived: boolean;
    color: string;
    createdAt: Date;
    defaultView: string;
    dueDate: Date;
    dueOn: Date;
    htmlNotes: string;
    members: [AsanaResourceInterface];
    modifiedAt: Date;
    notes: string;
    public: boolean;
    startOn: Date;
    customFields: [CustomField];
    customFieldSettings: [{gid:string,customField:CustomField}];
    completed: boolean;
    completedAt: Date;
    completedBy: AsanaResourceInterface;
    followers: [AsanaResourceInterface];
    owner: AsanaResourceInterface;
    icon: string;
    permalinkUrl: string;
    createdFromTemplate: AsanaResourceInterface;
}