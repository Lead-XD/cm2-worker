import {cloudmateProjectData, eventInterface} from "./asanaEvent.interface";


interface TypeFormEventDocumentInterface extends eventInterface {
    cm: cloudmateProjectData
    eventId: string;
    eventType: string;
    formResponse: {
        formId: string;
        token: string;
        landedAt: string; // Use string if dates are in ISO format, or Date if parsed
        submittedAt: string;
        hidden:any,
        definition: {
            id: string;
            title: string;
            fields: Array<{
                id: string;
                title: string;
                type: string;
                ref: string;
                properties?: any;
            }>;
        };
        answers: Array<{
            type: string;
            question?: {
                id?: string;
                ref?: string;
            };
            field?: {
                id?: string;
                ref?: string;
            };
            text?: string;
            email?: string;
            choice?: {
                label?: string;
            };
            choices?: {
                labels: string[];
            };
            boolean?: boolean;
            number?: number;
            date?: string;
            fileUrl?: string;
        }>;
        metadata: {
            userAgent?: string;
            platform?: string;
            referer?: string;
            networkId?: string;
            browser?: string;
            ip?: string;
            acceptLanguage?: string;
        };
    };
}

export default TypeFormEventDocumentInterface;