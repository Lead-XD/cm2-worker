import mongoose from "mongoose";

import {
    EventFilterTypes,
    EventSources
} from "../constants/eventFilter.constants";
import {EventFilterDocumentInterface} from "../interfaces/eventFilter.interface";
import connectToCM2DB from "../config/database.config";


export type EventFilterDocument =
    mongoose.Document
    & EventFilterDocumentInterface;

const eventFilterSchema = new mongoose.Schema<EventFilterDocument>(
    {
        name: {
            type: String,
            unique: true,
        },
        description: String,
        eventSource: {
            type: String,
            enum: Object.values(EventSources),
        },
        filter: {
            type: Object,
        },
        filterType: {
            type: String,
            enum: Object.values(EventFilterTypes),
        },
        match: String
    },
    {
        timestamps: true
    }
);

let EventFilter;
const cm2DBConnection = connectToCM2DB(process.env.CM2_MONGODB_URI!)
if (cm2DBConnection) {
    try {
        EventFilter = cm2DBConnection.model("EventFilter");
    } catch (e) {
        EventFilter = cm2DBConnection.model<EventFilterDocument>("EventFilter", eventFilterSchema);
    }
}


export default EventFilter as mongoose.Model<EventFilterDocument>;