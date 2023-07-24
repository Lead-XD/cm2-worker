import mongoose from "mongoose";
import {CommandExecStatus} from "../constants/command.constants";
import {ExecutedCommandDocumentType} from "../interaces/command.interface";


export type ExecutedCommandDocument =
    mongoose.Document
    & ExecutedCommandDocumentType;

const executedCommandSchema = new mongoose.Schema<ExecutedCommandDocument>(
    {
        command: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Command"
        },
        priority: Number,
        jobID: String,
        triggerEvent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AsanaEvent"
        },
        execStatus: {
            type: String,
            enum: Object.values(CommandExecStatus),
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        exception:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exception"
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization"
        }
    },
    {
        timestamps: true
    }
);

let ExecutedCommandModel;

try {
    ExecutedCommandModel = mongoose.model("ExecutedCommand");
} catch (e) {
    ExecutedCommandModel = mongoose.model<ExecutedCommandDocument>("ExecutedCommand", executedCommandSchema);
}

export default ExecutedCommandModel as mongoose.Model<ExecutedCommandDocument>;