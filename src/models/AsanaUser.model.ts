import mongoose from "mongoose";
import {AsanaUserDocumentInterface} from "../interfaces/asanaUser.interface";
import {AsanaResourceTypes} from "../constants/asana.constants";
import connectToCM2DB from "../config/database.config";



export type AsanaUserDocument = mongoose.Document & AsanaUserDocumentInterface;

const asanaUserSchema = new mongoose.Schema<AsanaUserDocument>(
    {
        gid: {type: String, required: true},
        resourceType: {
            type: String,
            enum: AsanaResourceTypes,
        },
        name: {type: String, required: true},
        email: {type: String, required: true},
        photo: {
            image21x21: String,
            image27x27: String,
            image36x36: String,
            image60x60: String,
            image128x128: String,
            image1024x1024: String
        },
        workspaces: [{
            gid: {type: String, required: true},
            resourceType: {
                type: String,
                enum: AsanaResourceTypes,
            },
            name: {type: String, required: true},
        }],
    },
    {
        timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
        strict: true
    }
);


let AsanaUser;
const cm2DBConnection = connectToCM2DB(process.env.CM2_MONGODB_URI!)
if (cm2DBConnection) {
    try {
        AsanaUser = cm2DBConnection.model("AsanaUser");
    } catch (e) {
        AsanaUser = cm2DBConnection.model<AsanaUserDocument>("AsanaUser", asanaUserSchema);
    }
}


export default AsanaUser as mongoose.Model<AsanaUserDocument>;