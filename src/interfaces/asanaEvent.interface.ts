import { Timestamp } from "mongodb";
import {AsanaEventSources} from "../constants/constants";
import mongoose from "mongoose";

export interface gidResourceType {
    gid: string;
    resourceType: string;
}

export interface gidResourceTypeSubType extends gidResourceType {
    resourceSubtype: string;
}

export interface addedValueType extends gidResourceType {
    user:gidResourceType;
}
export interface cloudmateProjectData {
    project: string;
    projectGID:string,
    projectType:string,
    source: AsanaEventSources,
    identifier: string;
    processed: boolean;
    exception:mongoose.Schema.Types.ObjectId,
}

export interface AsanaEventDocumentInterface {

    receivedAt?: Timestamp;
    updatedAt?: Timestamp;
    internalStatus?: string;
    user: gidResourceType;
    createdAt?: Timestamp;
    action?:string;
    change?:{
        action:string;
        field:string;
        addedValue:addedValueType;
    }
    field?: string;
    newValue?: gidResourceType;
    removedValue?: gidResourceType;
    resource?: gidResourceTypeSubType;
    parent?:gidResourceTypeSubType;
    cm:cloudmateProjectData

}