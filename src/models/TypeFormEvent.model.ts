import mongoose from "mongoose";
import TypeFormEventDocumentInterface from "../interfaces/typeForm.interface";
import connectToCM2DB from "../config/database.config";


const {Schema} = mongoose;

export type TypeFormEventDocument =
    mongoose.Document
    & TypeFormEventDocumentInterface;


const typeFormEventSchema = new Schema(
    {
        eventId: {type: String, required: true},
        eventType: {type: String, required: true},
        formResponse: {
            formId: {type: String, required: true},
            token: {type: String, required: true},
            landedAt: {type: Date, required: true},
            submittedAt: {type: Date, required: true},
            definition: {
                id: {type: String, required: true},
                title: {type: String, required: true},
                fields: [
                    {
                        id: {type: String, required: true},
                        title: {type: String, required: true},
                        type: {type: String, required: true},
                        ref: {type: String, required: true},
                        properties: {type: Schema.Types.Mixed}, // Can be any type
                    },
                ],
            },
            answers: [
                {
                    type: {type: String, required: true},
                    question: {
                        id: {type: String},
                        ref: {type: String},
                    },
                    field: {
                        id: {type: String},
                        ref: {type: String},
                    },
                    text: {type: String},
                    email: {type: String},
                    choice: {
                        label: {type: String},
                    },
                    choices: {
                        labels: [String],
                    },
                    boolean: {type: Boolean},
                    number: {type: Number},
                    date: {type: Date},
                    fileUrl: {type: String},
                },
            ],
            metadata: {
                userAgent: {type: String},
                platform: {type: String},
                referer: {type: String},
                networkId: {type: String},
                browser: {type: String},
                ip: {type: String},
                acceptLanguage: {type: String},
            },
        },
    },
    {
        strict: false,
        timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}
    }
);


let TypeFormEvent;
const cm2DBConnection = connectToCM2DB(process.env.CM2_MONGODB_URI!)
if (cm2DBConnection) {
    try {
        TypeFormEvent = cm2DBConnection.model("TypeFormEvent");
    } catch (e) {
        TypeFormEvent = cm2DBConnection.model<TypeFormEventDocument>("TypeFormEvent", typeFormEventSchema);
    }
}

export default TypeFormEvent as mongoose.Model<TypeFormEventDocument>;