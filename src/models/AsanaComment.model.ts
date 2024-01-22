import mongoose from "mongoose";
import {AsanaCommentDocumentInterface} from "../interfaces/asanaComment.interface";
import connectToCM2DB from "../config/database.config";


export type AsanaCommentDocument =
    mongoose.Document
    & AsanaCommentDocumentInterface;

const asanaCommentSchema = new mongoose.Schema<AsanaCommentDocument>(
    {
        gid: {type: String, required: true, unique: true},
        resourceType: {type: String, required: true},
        createdAt: {type: String, required: true},
        resourceSubtype: {type: String, required: true},
        text: {type: String, required: true},
        htmlText: {type: String},
        isPinned: {type: Boolean},
        stickerName: {type: String},
        createdBy: {
            gid: {type: String},
            resourceType: {type: String},
            name: {type: String},
        },
        type: {type: String, required: true},
        isEditable: {type: Boolean},
        isEdited: {type: Boolean, required: true},
        hearted: {type: Boolean, required: true},
        hearts: [
            {
                gid: {type: String, required: true},
                user: {
                    gid: {type: String, required: true},
                    resourceType: {type: String, required: true},
                    name: {type: String, required: true},
                },
            },
        ],
        numHearts: {type: Number, required: true},
        liked: {type: Boolean, required: true},
        likes: [
            {
                gid: {type: String, required: true},
                user: {
                    gid: {type: String, required: true},
                    resourceType: {type: String, required: true},
                    name: {type: String, required: true},
                },
            },
        ],
        numLikes: {type: Number, required: true,},
        oldResourceSubtype : {type: String},
        newResourceSubtype : {type: String},
        oldTextValue : {type: String},
        newTextValue : {type: String},
        source : {type: String},
        target: {
            gid: {type: String, required: true},
            _id: {type: mongoose.Schema.Types.ObjectId, ref: "AsanaTask"},
        }
    },
    {
        timestamps: {createdAt: "createdAt_", updatedAt: "updatedAt"},
        strict: true
    }
);


let AsanaComment;
const cm2DBConnection = connectToCM2DB(process.env.CM2_MONGODB_URI!)
if (cm2DBConnection) {
    try {
        AsanaComment = cm2DBConnection.model("AsanaComment");
    } catch (e) {
        AsanaComment = cm2DBConnection.model<AsanaCommentDocument>("AsanaComment", asanaCommentSchema);
    }
}

export default AsanaComment as mongoose.Model<AsanaCommentDocument>;