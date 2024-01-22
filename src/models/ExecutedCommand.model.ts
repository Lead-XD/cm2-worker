import mongoose from "mongoose";
import {CommandExecStatus} from "../constants/command.constants";
import {ExecutedCommandDocumentType} from "../interfaces/command.interface";
import connectToCM2DB from "../config/database.config";


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
        exception: {
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
const cm2DBConnection = connectToCM2DB(process.env.CM2_MONGODB_URI!)
if (cm2DBConnection) {
    try {

        ExecutedCommand = cm2DBConnection.model("ExecutedCommand");
    } catch (e) {
        ExecutedCommand = cm2DBConnection.model<ExecutedCommandDocument>("ExecutedCommand", executedCommandSchema);
    }
}


export default ExecutedCommand as mongoose.Model<ExecutedCommandDocument>;