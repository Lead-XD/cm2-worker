import mongoose from "mongoose";
import {
    CloudmateExceptionMetaDataTypes, CloudmateExceptionTypes, ExceptionSources
} from "../constants/exception.constants";

export interface CloudmateExceptionMetaData  {
    type: CloudmateExceptionMetaDataTypes,
    ref?:  String,
    data?:  any,
}

export interface CloudmateExceptionInterface {
    organization?:mongoose.Types.ObjectId,
    name?:string,
    message?:string,
    description?:string,
    statusCode?:number,
    stack?:string,
    exceptionErrors?:string[],
    metaData?:CloudmateExceptionMetaData,
    createdAt?:Date,
    updatedAt?: Date,
    code?:string,
    field?:string
    exceptionTaskGID?:string;
    exceptionNotificationStoryGID?:string;
    notificationTextData?:{
        notificationKey:string;
        notificationReplacements:{[key: string]:string};
    },
    parentTaskGID?:string,
    sourceTaskGID:string,
    uncompleteSourceTask?:boolean,
    useSimone?:boolean,
    throwInAsana?:boolean,
    source?:ExceptionSources
}

