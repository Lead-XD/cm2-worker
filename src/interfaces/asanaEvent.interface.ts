import { Timestamp } from "mongodb";
import {EventSources} from "../constants/constants";
import mongoose from "mongoose";

interface gidResourceType {
    gid: string;
    resourceType: string;
}

interface gidResourceTypeSubType extends gidResourceType {
    resourceSubtype: string;
}

interface addedValueType extends gidResourceType {
    user:gidResourceType;
}
export interface eventInterface {
    cm:cloudmateProjectData
}

export interface cloudmateProjectData {
    project: string;
    projectGID:string,
    projectType:string,
    source: EventSources,
    identifier: string;
    processed: boolean;
    exception:mongoose.Schema.Types.ObjectId,
}

export interface asanaEventDocumentInterface extends eventInterface {

    receivedAt?: Timestamp;
    updatedAt?: Timestamp;
    internalStatus?: string;
    user: gidResourceType;
    createdAt?: Timestamp;
    action?:string;
    change?:{
        action: string;
        field: string;
        addedValue?: addedValueType;
        newValue?: gidResourceType;
        removedValue?: gidResourceType;
    }
    resource?: gidResourceTypeSubType;
    parent?:gidResourceTypeSubType;

}