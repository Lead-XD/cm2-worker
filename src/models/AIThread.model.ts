import {LLMRole} from "../constants/ai.constants";
import connectToCM2DB from "../config/database.config";
import {AIThreadDocumentInterface} from "../interfaces/aiThread.interface";
import mongoose from "mongoose";


export interface AIThreadDocument  extends  mongoose.Document ,AIThreadDocumentInterface {
    _id: mongoose.Types.ObjectId;
};

const aiThreadSchema = new mongoose.Schema<AIThreadDocument>(
    {
       organization:{ type: mongoose.Schema.Types.ObjectId, required: true},
        userGID: {type: String, required: true},
        modelName: { type: String, required: true},
        taskGID: { type: String, required: true},
        messages: [{
            role: { type: String, enum: Object.values(LLMRole) },
            content: { type: String },
        }],
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
        strict: true
    }
);
let AIThread;
const cm2DBConnection = connectToCM2DB(process.env.CM2_MONGODB_URI!)
try {
    AIThread = cm2DBConnection.model("AIThread");
} catch (e) {
    AIThread = cm2DBConnection.model<AIThreadDocument>("AIThread", aiThreadSchema);
}

export default AIThread as mongoose.Model<AIThreadDocument>;