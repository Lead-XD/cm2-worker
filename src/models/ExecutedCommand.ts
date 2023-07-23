import mongoose from "mongoose";
import {ExecutedCommandDocumentInterface} from "../interfaces/command.interface";
import {CommandExecStatus} from "../constants/command.constants";


export type ExecutedCommandDocument =
    mongoose.Document
    & ExecutedCommandDocumentInterface;

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