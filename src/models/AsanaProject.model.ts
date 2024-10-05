import connectToCM2DB from "../config/database.config";
import mongoose from "mongoose";
import {
    AsanaProjectDocumentInterface,
} from "../interfaces/project.interface";
import {isRequired} from "../constants/constants";



export interface AsanaProjectDocument extends AsanaProjectDocumentInterface, mongoose.Document {
    _id: mongoose.Types.ObjectId;
}

const asanaProjectSchema = new mongoose.Schema<AsanaProjectDocument>(
    {
        app: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, `App _id ${isRequired}`]
        },
        workspaceGID: String,
        gid: String,
        team: {
            gid: String,
            resourceType: String,
            name: String,
        },
        name: String,
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
        customFieldSettings: [{type:Object}],
        customFields: [{type:Object}],
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
    {timestamps: {createdAt: "createdAt_", updatedAt: "updatedAt_"},strict: false}
);


let AsanaProject;
const cm2DBConnection = connectToCM2DB(process.env.CM2_MONGODB_URI!)
try {
    AsanaProject = cm2DBConnection.model("AsanaProject");
} catch (e) {
    AsanaProject = cm2DBConnection.model<AsanaProjectDocument>("AsanaProject", asanaProjectSchema);
}

export default AsanaProject as mongoose.Model<AsanaProjectDocument>;