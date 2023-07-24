import mongoose from "mongoose";
import {AsanaEventSources} from "../constants/constants";
import { asanaEventDocumentInterface } from "../interaces/asanaEvent.interface";
export type AsanaEventDocument = mongoose.Document & asanaEventDocumentInterface;

const asanaEventSchema = new mongoose.Schema<AsanaEventDocument>(
    {
        receivedAt: Date,
        updatedAt: Date,

        user: {
            gid: String,
            resourceType: String,
        },
        createdAt: Date,
        action:String,
        
        change:{
            action: String,
            field: String,
            addedValue: {
                gid: String,
                resourceType: String,
                user:{
                    gid: String,
                    resourceType: String,
                }
            },
        },
        
        field: String,
        
        newValue: {
            gid: String,
            resourceType: String,
        },
        removedValue: {
            gid: String,
            resourceType: String,
        },
        resource: {
            gid: String,
            resourceType: String,
            resourceSubtype: String
        },
        parent: {
            gid: String,
            resourceType: String,
            resourceSubtype: String
        },
        cm:{
            project: String,
            projectGID:String,
            projectType:String,
            source:{
                type:String,
                enum:Object.values(AsanaEventSources)
            },
            identifier: {type:String,unique:true},
            processed: Boolean,
            exception:{type:mongoose.Schema.Types.ObjectId, ref: "Exception"},
        }
    },
    { timestamps: { createdAt: "receivedAt", updatedAt:"updatedAt" } }
);
let AsanaEvent;

try{
    AsanaEvent  = mongoose.model("AsanaEvent");
}catch(e){
    AsanaEvent =  mongoose.model<AsanaEventDocument>("AsanaEvent", asanaEventSchema);
}


export default AsanaEvent as mongoose.Model<AsanaEventDocument>;