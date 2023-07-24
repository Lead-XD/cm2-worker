import mongoose from "mongoose";
import {CommandStatus} from "../constants/command.constants";
import {CommandDocumentInterface} from "../interaces/command.interface";


export type CommandDocument = mongoose.Document & CommandDocumentInterface;

const commandSchema = new mongoose.Schema<CommandDocument>(
    {
        name: {
            type:String,
            unique: true,
        },
        description: String,
        work: String,
        status:{
            type: String,
            enum: Object.values(CommandStatus),
        },
        priority: Number,
        eventFilter:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "EventFilter"
        } ,
        default:Boolean,
        worker:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Worker"
        }
    },
    {
        timestamps: true
    }
);

let Command;

try {
    Command = mongoose.model("Command");
} catch (e) {
    Command = mongoose.model<CommandDocument>("Command", commandSchema);
}

export default Command as mongoose.Model<CommandDocument>;