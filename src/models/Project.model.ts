import mongoose from "mongoose";


import {isRequired, organizationAppTypes} from "../constants/constants";
import {ProjectTypes} from "../constants/project.constants";
import {VariableTypes} from "../constants/variable.constants";
import {ChannelStatus} from "../constants/channel.constants";
import {CommandStatus} from "../constants/command.constants";
import {ProjectDocumentInterface} from "../interfaces/project.interface";
import connectToCM2DB from "../config/database.config";

export type ProjectDocument = mongoose.Document & ProjectDocumentInterface;

const projectSchema = new mongoose.Schema<ProjectDocument>(
    {
        app: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, `App _id ${isRequired}`]
        },
        workspaceGID: String,
        projectGID: String,
        teamGID: String,
        teamName: String,
        name: String,
        projectType: {
            type: String,
            enum: ProjectTypes,
        },
        webhookSecret: {
            [organizationAppTypes.asana]: String,
        },
        messageDetails: {
            sms: {
                status: {type: String, enum: ChannelStatus},
                outboxProject: {
                    type: mongoose.Schema.Types.ObjectId,
                    default: null,
                    ref: "Project"
                },
                inboxProject: {
                    type: mongoose.Schema.Types.ObjectId,
                    default: null,
                    ref: "Project"
                },
                phoneNumber: String,
                messageSignature: String,
            },
            email: {
                status: {type: String, enum: Object.values(ChannelStatus)},
                outboxProject: {
                    type: mongoose.Schema.Types.ObjectId,
                    default: null,
                    ref: "Project"
                },
                inboxProject: {
                    type: mongoose.Schema.Types.ObjectId,
                    default: null,
                    ref: "Project"
                },
                emailAddress: String,
                provider: String,
                messageSignature: String,
                signatureImageURL: String,
            },
        },
        variables: [{
            id: {type: mongoose.Schema.Types.ObjectId, ref: "Variable"},
            type: {
                type: String,
                enum: Object.values(VariableTypes),
            }
        }],
        commands: [{
            id: {type: mongoose.Schema.Types.ObjectId, ref: "Command"},
            status: {type: String, enum: Object.values(CommandStatus)},
            projectFilters: [mongoose.Schema.Types.Mixed],
            configurationsInstance: mongoose.Schema.Types.Mixed,
        }],
        resourceType: {type: String},
        archived: {type: Boolean},
        color: {type: String},
        createdAt: {type: Date},
        defaultView: {type: String},
        dueDate: {type: Date},
        dueOn: {type: Date},
        htmlNotes: {type: String},
        members: [{
            gid: {type: String},
            resourceType: {type: String},
            name: {type: String},
        },],
        modifiedAt: {type: Date},
        notes: {type: String},
        public: {type: Boolean},
        startOn: {type: Date},
        customFields: [{
            gid: {type: String, required: true},
            name: {type: String, required: true},
            type: {type: String, required: true},
            enumOptions: {
                required: false,
                type: [
                    {
                        gid: {type: String, required: true},
                        resourceType: {type: String, required: true},
                        name: {type: String, required: true},
                        enabled: {type: Boolean, required: true},
                        color: {type: String, required: true},
                    },
                ]
            },
            enumValue: {
                required: false,
                type: {
                    gid: {type: String, required: true},
                    name: {type: String, required: true},
                }
            },
            multiEnumValues: [{
                required: false,
                type: {
                    gid: {type: String, required: true},
                    name: {type: String, required: true},
                }
            }],
            displayValue: {type: String},
            description: {type: String},
        },],
        completed: {type: Boolean},
        completedAt: {type: Date},
        completedBy: {
            gid: {type: String},
            resourceType: {type: String},
            name: {type: String},
        },
        followers: [{
            gid: {type: String},
            resourceType: {type: String},
            name: {type: String},
        }],
        owner: {
            gid: {type: String},
            resourceType: {type: String},
            name: {type: String},
        },
        icon: {type: String},
        permalinkUrl: {type: String},
        createdFromTemplate: {
            gid: {type: String},
            resourceType: {type: String},
            name: {type: String},
        },
    },
    {timestamps: {createdAt: "createdAt_", updatedAt: "updatedAt_"},}
);

projectSchema.index({name: 'text'});

let Project;
const cm2DBConnection = connectToCM2DB(process.env.CM2_MONGODB_URI!)
if (cm2DBConnection) {
    try {
        Project = cm2DBConnection.model("Project");
    } catch (e) {
        Project = cm2DBConnection.model<ProjectDocument>("Project", projectSchema);
    }
}


export const SMSChannelFields = {
    workspaceGID: 1,
    projectGID: 1,
    name: 1,
    "messageDetails.sms": 1,
    variables: 1
};
export const emailChannelFields = {
    workspaceGID: 1,
    projectGID: 1,
    name: 1,
    "messageDetails.email": 1,
    variables: 1
};

export default Project as mongoose.Model<ProjectDocument>;