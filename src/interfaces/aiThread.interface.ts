import {LLMRole} from "../constants/ai.constants";
import mongoose from "mongoose";

export interface AIThreadDocumentInterface {
    organization:mongoose.Types.ObjectId,
    userGID: string,
    modelName: string,
    taskGID: string,
    messages: Message[],
}

interface Message {
    role:LLMRole
    content: string,
}


