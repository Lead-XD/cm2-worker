import {
    CloudmateExceptionInterface,
    CloudmateExceptionMetaData,
} from "../interfaces/cloudmateException.interface";
import {CloudmateExceptionTypes} from "../constants/exception.constants";
import mongoose from "mongoose";


export class CloudmateException extends Error {
    organization?:mongoose.Types.ObjectId;
    description?:string;
    type?:CloudmateExceptionTypes;
    statusCode?:number;
    code?: string;
    exceptionErrors?: string[];
    metaData?:CloudmateExceptionMetaData;
    field?:string;
    exceptionTaskGID?:string;
    exceptionNotificationStoryGID?:string;
    notificationTextData?:{
        notificationKey:string;
        notificationReplacements:{[key: string]:string};
    };
    parentTaskGID?:string;
    sourceTaskGID:string;
    uncompleteSourceTask:boolean;
    useSimone?:boolean;

    constructor(cloudmateExceptionObj:CloudmateExceptionInterface){
        super();
        this.name = cloudmateExceptionObj.name||this.name;
        this.message = cloudmateExceptionObj.message||this.message;
        this.description = cloudmateExceptionObj.description||this.description||this.message;
        this.metaData = cloudmateExceptionObj.metaData;
        this.statusCode= cloudmateExceptionObj.statusCode?cloudmateExceptionObj.statusCode:500;
        this.exceptionErrors = [];
        this.type = CloudmateExceptionTypes.cloudmate;
        this.exceptionTaskGID = cloudmateExceptionObj.exceptionTaskGID
        this.exceptionNotificationStoryGID = cloudmateExceptionObj.exceptionNotificationStoryGID;
        this.notificationTextData = cloudmateExceptionObj.notificationTextData;
        this.code = cloudmateExceptionObj.code;
        this.parentTaskGID = cloudmateExceptionObj.parentTaskGID;
        this.sourceTaskGID = cloudmateExceptionObj.sourceTaskGID;
        this.uncompleteSourceTask = cloudmateExceptionObj.uncompleteSourceTask||false;
        this.useSimone = cloudmateExceptionObj.useSimone||false;
    }
}


export class UnknownException extends CloudmateException {
    constructor(cloudmateExceptionObj:CloudmateExceptionInterface,exception:any){
        super(cloudmateExceptionObj);
        this.type = CloudmateExceptionTypes.unknown;
        if(exception){
            this.name = exception.name;
            this.message = exception.message;
            this.statusCode = 500;
            this.stack = exception.stack;
            this.exceptionErrors = [];
        }
    }
}

export class Cloudmate2APIException extends CloudmateException {
    constructor(cloudmateExceptionObj:CloudmateExceptionInterface,cloudmate2APIException:any){
        super(cloudmateExceptionObj);
        this.type = CloudmateExceptionTypes.cloudmate2API;
        if(cloudmate2APIException && cloudmate2APIException.response ){
            this.statusCode = cloudmate2APIException.response.status;
            this.message = cloudmate2APIException.message;
            this.stack = cloudmate2APIException.stack;
            this.code = cloudmate2APIException.code;
            this.description = cloudmate2APIException.response.data?.message;
        }
    }
}