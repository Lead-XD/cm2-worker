import mongoose from "mongoose";

import {
    EventFilterTypes,
    EventSources
} from "../constants/eventFilter.constants";
import {EventFilterDocumentType} from "../types/eventFilter.interface";

export type EventFilterDocument =
    mongoose.Document
    & EventFilterDocumentType;

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
        match:String
    },
    {
        timestamps: true
    }
);

let EventFilter;

try {
    EventFilter = mongoose.model("EventFilter");
} catch (e) {
    EventFilter = mongoose.model<EventFilterDocument>("EventFilter", eventFilterSchema);
}

export default EventFilter as mongoose.Model<EventFilterDocument>;