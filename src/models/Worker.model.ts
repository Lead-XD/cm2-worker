import mongoose from "mongoose";
import {WorkerDocumentInterface} from "../interfaces/command.interface";
import connectToCM2DB from "../config/database.config";


export type WorkerDocument = mongoose.Document & WorkerDocumentInterface;

const workerSchema = new mongoose.Schema<WorkerDocument>(
    {
        name: {
            type: String,
            unique: true,
        },
        description: String,
        queueName: {
            type: String,
            unique: true,
        },
        jwt: String,
    },
    {
        timestamps: true
    }
);

let Worker;
const cm2DBConnection = connectToCM2DB(process.env.CM2_MONGODB_URI!)
if (cm2DBConnection) {
    try {
        Worker = cm2DBConnection.model("Worker");
    } catch (e) {
        Worker = cm2DBConnection.model<WorkerDocument>("Worker", workerSchema);
    }
}


export default Worker as mongoose.Model<WorkerDocument>;