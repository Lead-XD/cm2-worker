import mongoose from "mongoose";
import {AsanaTaskDocumentInterface} from "../interaces/asanaTask.interface";


export type AsanaTaskDocument = mongoose.Document & AsanaTaskDocumentInterface;

const asanaTaskSchema = new mongoose.Schema<AsanaTaskDocument>(
    {
        gid: {type: String, required: true, unique: true},
        resourceType: {type: String, required: true},
        name: {type: String, required: true},
        resourceSubtype: {type: String, required: true},
        approvalStatus: {type: String},
        assigneeStatus: {type: String},
        completed: {type: Boolean, required: true},
        completedAt: {type: String},
        completedBy: {
            gid: {type: String},
            resourceType: {type: String},
            name: {type: String},
        },
        createdAt: {type: String, required: true},
        dependencies: [
            {
                gid: {type: String, required: true},
                resourceType: {type: String, required: true},
            },
        ],
        dependents: [
            {
                gid: {type: String, required: true},
                resourceType: {type: String, required: true},
            },
        ],
        dueAt: {type: String},
        dueOn: {type: String},
        external: {
            gid: {type: String},
            data: {type: String},
        },
        htmlNotes: {type: String},
        hearted: {type: Boolean},
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
        isRenderedAsSeparator: {type: Boolean},
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
        memberships: [
            {
                project: {
                    gid: {type: String, required: true},
                    resourceType: {type: String, required: true},
                    name: {type: String, required: true},
                },
                section: {
                    gid: {type: String, required: true},
                    resourceType: {type: String, required: true},
                    name: {type: String, required: true},
                },
            },
        ],
        modifiedAt: {type: String},
        notes: {type: String},
        numHearts: {type: Number},
        numLikes: {type: Number},
        numSubtasks: {type: Number},
        startAt: {type: String},
        startOn: {type: String},
        actualTimeMinutes: {type: Number},
        assignee: {
            gid: {type: String},
            resourceType: {type: String},
            name: {type: String},
        },
        assigneeSection: {
            gid: {type: String},
            resourceType: {type: String},
            name: {type: String},
        },
        customFields: [
            {
                gid: {type: String, required: true},
                name: {type: String, required: true},
                type: {type: String, required: true},
                enumOptions: {
                    required: false,
                    type: [
                        {
                            gid: {type: String, required: true},
                            resourceType: {type: String, required: true},
                            name: {type: String, required: true},
                            enabled: {type: Boolean, required: true},
                            color: {type: String, required: true},
                        },
                    ]
                },
                enumValue: {
                    required: false,
                    type: {
                        gid: {type: String, required: true},
                        name: {type: String, required: true},
                    }
                },
                displayValue: {type: String},
                description: {type: String},
            },
        ],
        followers: [
            {
                gid: {type: String, required: true},
                resourceType: {type: String, required: true},
                name: {type: String, required: true},
            },
        ],
        parent: {
            gid: {type: String},
            resourceType: {type: String},
            name: {type: String},
            resourceSubtype: {type: String},
        },
        projects: [
            {
                gid: {type: String, required: true},
                resourceType: {type: String, required: true},
                name: {type: String, required: true},
            },
        ],
        tags: [
            {
                gid: {type: String, required: true},
                name: {type: String, required: true},
            },
        ],
        workspace: {
            gid: {type: String, required: true},
            resourceType: {type: String, required: true},
            name: {type: String, required: true},
        },
        permalinkUrl: {type: String, required: true},
    },
    {
        timestamps: { createdAt: "createdAt_", updatedAt:"updatedAt_" },
        strict: true
    }
);

let AsanaTask;

try {
    AsanaTask = mongoose.model("AsanaTask");
} catch (e) {
    AsanaTask = mongoose.model<AsanaTaskDocument>("AsanaTask", asanaTaskSchema);
}

export default AsanaTask as mongoose.Model<AsanaTaskDocument>;