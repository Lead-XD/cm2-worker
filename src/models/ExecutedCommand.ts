import mongoose from "mongoose";
import {CommandExecStatus} from "../constants/command.constants";
import {ExecutedCommandDocumentType} from "../types/command.interface";


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

let ExecutedCommand;

try {
    ExecutedCommand = mongoose.model("ExecutedCommand");
} catch (e) {
    ExecutedCommand = mongoose.model<ExecutedCommandDocument>("ExecutedCommand", executedCommandSchema);
}

export default ExecutedCommand as mongoose.Model<ExecutedCommandDocument>;