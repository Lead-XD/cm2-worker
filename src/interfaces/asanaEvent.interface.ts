import { Timestamp } from "mongodb";
import {AsanaEventSources} from "../constants/constants";
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
interface cloudmateProjectData {
    project: string;
    projectGID:string,
    projectType:string,
    source: AsanaEventSources,
    identifier: string;
    processed: boolean;
    exception:mongoose.Schema.Types.ObjectId,
}

export interface asanaEventDocumentInterface {

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
    cm:cloudmateProjectData

}