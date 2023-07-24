import mongoose from "mongoose";
import {WorkerDocumentInterface} from "../interaces/command.interface";




export type WorkerDocument = mongoose.Document & WorkerDocumentInterface;

const workerSchema = new mongoose.Schema<WorkerDocument>(
    {
        name: {
            type:String,
            unique: true,
        },
        description: String,
        queueName:{
            type:String,
            unique: true,
        },
        jwt:String,
    },
    {
        timestamps: true
    }
);

let Worker;

try {
    Worker = mongoose.model("Worker");
} catch (e) {
    Worker = mongoose.model<WorkerDocument>("Worker", workerSchema);
}

export default Worker as mongoose.Model<WorkerDocument>;