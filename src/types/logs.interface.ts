import mongoose from "mongoose";
import {
    workExecStatus,
    workTriggerType,
    workType
} from "../constants/logs.constants";

export type WorkLog = {
    name: string,
    startTime: Date,
    endTime?: Date,
    trigger:{
        id:mongoose.Schema.Types.ObjectId,
        type:workTriggerType,
    },
    workType:workType,
    status: workExecStatus,
}
