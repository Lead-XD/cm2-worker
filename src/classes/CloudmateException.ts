import {
    CloudmateExceptionMetaData,
    CloudmateExceptionType
} from "../interaces/cloudmateException.interface";
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

    constructor(cloudmateExceptionObj:CloudmateExceptionType){
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
    constructor(cloudmateExceptionObj:CloudmateExceptionType,exception:any){
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


export class TwilioException extends CloudmateException {
    constructor(cloudmateExceptionObj:CloudmateExceptionType,twilioException:any){
        super(cloudmateExceptionObj);
        this.type = CloudmateExceptionTypes.twilio;
        if(twilioException){
            this.name = twilioException.name;
            this.message = twilioException.message;
            this.statusCode = twilioException.status;
            this.stack = twilioException.stack;
            this.exceptionErrors = [twilioException.moreInfo];
            this.code = twilioException.code;
            this.description = [twilioException.moreInfo].join(",");
        }
    }
}


export class SendGridException extends CloudmateException {
    constructor(cloudmateExceptionObj:CloudmateExceptionType,sendGridException:any){
        super(cloudmateExceptionObj);
        this.type = CloudmateExceptionTypes.sendGrid;
        if(sendGridException){
            this.statusCode = sendGridException.code;
            this.stack = sendGridException.stack;
            this.exceptionErrors = sendGridException.response.body.errors.map((obj:any)=> obj.message);
            this.code = sendGridException.code;
            this.field = sendGridException.response.body.errors[0].field;
            this.description = sendGridException.response.body.errors[0].message;
        }
    }
}