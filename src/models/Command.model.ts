import mongoose from "mongoose";
import {CommandStatus} from "../constants/command.constants";
import {CommandDocumentInterface} from "../interfaces/command.interface";
import connectToCM2DB from "../config/database.config";


export type CommandDocument = mongoose.Document & CommandDocumentInterface;

const commandSchema = new mongoose.Schema<CommandDocument>(
    {
        name: {
            type: String,
            unique: true,
        },
        description: String,
        work: String,
        status: {
            type: String,
            enum: Object.values(CommandStatus),
        },
        priority: Number,
        eventFilters:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "EventFilter"
        }],
        default: Boolean,
        worker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Worker"
        },
        inheritToChildren: Boolean,
        configurationsTemplate: mongoose.Schema.Types.Mixed,
    },
    {
        timestamps: true
    }
);

let Command;
const cm2DBConnection = connectToCM2DB(process.env.CM2_MONGODB_URI!)
if (cm2DBConnection) {
    try {
        Command = cm2DBConnection.model("Command");
    } catch (e) {
        Command = cm2DBConnection.model<CommandDocument>("Command", commandSchema);
    }
}


export default Command as mongoose.Model<CommandDocument>;