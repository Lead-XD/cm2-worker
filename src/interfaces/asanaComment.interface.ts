import {AsanaResourceInterface} from "./asana.interface";
import mongoose from "mongoose";

export interface AsanaCommentDocumentInterface {
    "gid": string,
    "resourceType": string,
    "createdAt": string,
    "resourceSubtype": string,
    "text": string,
    "htmlText"?: string,
    "isPinned"?: boolean,
    "stickerName"?: string,
    "createdBy": AsanaResourceInterface,
    "type": string,
    "isEditable": boolean,
    "isEdited": boolean,
    "hearted": boolean,
    "hearts"?: Heart[],
    "numHearts": number,
    "liked": boolean,
    "likes": Like[],
    "numLikes":number,
    "oldResourceSubtype"?: string,
    "newResourceSubtype"?: string,
    "oldTextValue"?: string,
    "newTextValue"?: string,
    "source"?: string,
    "target": {
        "gid": string,
        "_id": mongoose.Schema.Types.ObjectId,
    }
}


interface Like{
    "gid": string,
    "user": AsanaResourceInterface

}
interface Heart {
    "gid": string,
    "user": AsanaResourceInterface
}