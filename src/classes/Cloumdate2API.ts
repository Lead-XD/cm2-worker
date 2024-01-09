import axios from 'axios';
import mongoose from 'mongoose';
import {CloudmateException, UnknownException} from './CloudmateException';


export class Cloudmate2API {
    private readonly jwt: string;
    private baseURL = process.env.CLOUDMATE2_BASE_API_URL!;
    private organizationId: mongoose.Types.ObjectId;
    private readonly authHeaders;
    private urlMap = {
        task: {
            getTask: this.baseURL + "/task/getTask",
            updateTask: this.baseURL + "/task/updateTask",
            updateTaskBatch: this.baseURL + "/task/updateTaskBatch",
            addTaskToProject: this.baseURL + "/task/addTaskToProject",
            removeTaskFromProject: this.baseURL + "/task/removeTaskFromProject",
            createTask: this.baseURL + "/task/createTask",
            createSubTask: this.baseURL + "/task/createSubTask",
        },
        section:{
            getSectionsInProject: this.baseURL + "/section/getSectionsInProject",
            createSectionInProject: this.baseURL + "/section/createSectionInProject",
            addTaskToSection: this.baseURL + "/section/addTaskToSection",
        },
        customfield:{
            getCustomFieldSettingsForProject: this.baseURL + "/customfield/getCustomFieldSettingsForProject"
        },
        project: {
            getProjectByGID: this.baseURL + "/project/getProjectByGID",
            saveAllProjectsInWorkspace: this.baseURL + "/project/saveAllProjectsInWorkspace"
        },
        story: {
            postStoryOnTask: this.baseURL + "/story/postStoryOnTask",
            postNotificationOnTask: this.baseURL + "/story/postNotificationOnTask",
            updateNotificationOnTask: this.baseURL + "/story/updateNotificationOnTask"
        },
        exception: {
            createException: this.baseURL + "/exception/createException"
        }
    }

    constructor(jwt: string, organizationId: mongoose.Types.ObjectId) {
        this.jwt = jwt;
        this.organizationId = organizationId;
        this.authHeaders = {
            Authorization: `Bearer ${this.jwt}`,
            ['x-organization-id']: this.organizationId.toString()
        }
    }

    project= {
        getProjectByGID: async (projectGID: string) => {
            const response = await axios.get(`${this.urlMap.project.getProjectByGID}?projectGID=${projectGID}`, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        saveAllProjectsInWorkspace: async () => {
            const response = await axios.post(`${this.urlMap.project.saveAllProjectsInWorkspace}`,{} ,{
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        }
    }
    task = {
        getTask: async (taskGID: string) => {
            const response = await axios.get(`${this.urlMap.task.getTask}?taskGID=${taskGID}`, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        updateTask: async (taskGID: string, taskData: any) => {
            const response = await axios.put(this.urlMap.task.updateTask, {gid: taskGID, ...taskData}, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        createTask: async (data: any) => {
            const response = await axios.post(this.urlMap.task.createTask, data, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        createSubTask: async (parentTaskGID: string, subTaskData: any) => {
            const response = await axios.post(this.urlMap.task.createSubTask, {parentTaskGID: parentTaskGID, subTaskData:subTaskData}, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        updateTasksBatch: async (tasksData: any) => {
            const response = await axios.put(this.urlMap.task.updateTaskBatch, tasksData, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        addTaskToProject: async (taskGID: string, projectGID: string) => {
            const response = await axios.put(this.urlMap.task.addTaskToProject, {
                taskGID: taskGID,
                projectGID: projectGID
            }, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        removeTaskFromProject: async (taskGID: string, projectGID: string) => {
            const response = await axios.put(this.urlMap.task.removeTaskFromProject, {
                taskGID: taskGID,
                projectGID: projectGID
            }, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        }
    }

    story = {
        postStoryOnTask : async (taskGID: string, text: string, htmlText?: string, isPinned: boolean = false) => {
            const response = await axios.post(this.urlMap.story.postStoryOnTask, {
                taskGID: taskGID,
                text: text,
                htmlText: htmlText,
                isPinned: isPinned
            }, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        postNotificationOnTask : async (taskGID: string, key: string, replacements?: any, isPinned: boolean = false) => {
            const response = await axios.post(this.urlMap.story.postNotificationOnTask, {
                taskGID: taskGID,
                key: key,
                replacements: replacements,
                isPinned: isPinned
            }, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        updateNotificationOnTask : async (storyGID: string, key: string, replacements?: any) => {
            const response = await axios.put(this.urlMap.story.updateNotificationOnTask, {
                storyGID: storyGID,
                key: key,
                replacements: replacements,
            }, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        }
    }
    section={
        getSectionsInProject: async (projectGID: string) => {
            const response = await axios.get(`${this.urlMap.section.getSectionsInProject}?projectGID=${projectGID}`, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        createSectionInProject: async (projectGID: string, sectionName: string,insertBefore?:string,insertAfter?:string) => {
            const response = await axios.post(this.urlMap.section.createSectionInProject, {
                projectGID: projectGID,
                name: sectionName,
                insertBefore: insertBefore,
                insertAfter: insertAfter
            }, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        addTaskToSection: async (taskGID: string, sectionGID: string, insertBefore?: string, insertAfter?: string) => {
            const response = await axios.post(this.urlMap.section.addTaskToSection, {
                taskGID: taskGID,
                sectionGID: sectionGID,
                insertBefore: insertBefore,
                insertAfter: insertAfter
            }, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        }
    }
    customfield={
        getCustomFieldSettingsForProject: async (projectGID: string) => {
            const response = await axios.get(`${this.urlMap.customfield.getCustomFieldSettingsForProject}?projectGID=${projectGID}`, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        }
    }


    createException = async (cloudmateException: CloudmateException, triggerID: mongoose.Types.ObjectId, sourceTaskGID: string, parentTaskGID?: string, useSimone: boolean = false, uncompleteSource: boolean = false) => {
        const data = {
            sourceTaskGID: sourceTaskGID,
            name: cloudmateException.name,
            message: cloudmateException.message,
            description: cloudmateException.description,
            type: cloudmateException.type,
            statusCode: cloudmateException.statusCode,
            code: cloudmateException.code,
            field: cloudmateException.field,
            stack: cloudmateException.stack,
            exceptionErrors: cloudmateException.exceptionErrors,
            metaData: cloudmateException.metaData,
            parentTaskGID: parentTaskGID,
            useSimone: useSimone,
            exceptionUserNotificationData: cloudmateException.notificationTextData,
            triggerID: triggerID.toString(),
            uncompleteSourceTask: uncompleteSource
        };
        await axios.post(`${this.urlMap.exception.createException}`, data, {
            headers: {...this.authHeaders},

        })
    }
}
