import axios from 'axios';
import mongoose from 'mongoose';
import {CloudmateException, UnknownException} from './CloudmateException';
import {ProjectTypes} from "../constants/project.constants";


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
            setParentForTask: this.baseURL + "/task/setParentForTask",
            getAllTasksInProject: this.baseURL + "/task/getAllTasksInProject"
        },
        section: {
            getSectionsInProject: this.baseURL + "/section/getSectionsInProject",
            createSectionInProject: this.baseURL + "/section/createSectionInProject",
            addTaskToSection: this.baseURL + "/section/addTaskToSection",
        },
        customfield: {
            getCustomFieldSettingsForProject: this.baseURL + "/customfield/getCustomFieldSettingsForProject",
            getCustomFieldsByTypeAhead: this.baseURL + "/customfield/getCustomFieldsByTypeAhead",
            getCustomFieldByGID: this.baseURL + "/customField/getCustomFieldByGID",

        },
        project: {
            getProjectByGID: this.baseURL + "/project/getProjectByGID",
            saveAllProjectsInWorkspace: this.baseURL + "/project/saveAllProjectsInWorkspace",
            getProjectsByTypeAhead: this.baseURL + "/project/getProjectsByTypeAhead",
            createProjectFromProjectTemplate: this.baseURL + "/project/createProjectFromProjectTemplate"
        },
        story: {
            postStoryOnTask: this.baseURL + "/story/postStoryOnTask",
            updateStoryOnTask: this.baseURL + "/story/updateStoryOnTask",
            postNotificationOnTask: this.baseURL + "/story/postNotificationOnTask",
            updateNotificationOnTask: this.baseURL + "/story/updateNotificationOnTask",
            getAllStoriesFromATask: this.baseURL + "/story/getAllStoriesFromATask",
        },
        exception: {
            createException: this.baseURL + "/exception/createException"
        },
        attachment: {
            getAttachmentByGID: this.baseURL + "/asanaAttachment/getAttachmentByGID",
            postAttachmentToTask: this.baseURL + "/asanaAttachment/postAttachmentToTask"
        },
        command:{
            getAllCommands:this.baseURL+"/command/getAllCommands"
        },
        eventFilter:{
            getAllEventFilters:this.baseURL+"/eventFilter/getAllEventFilters"
        },
        variable:{
            replaceVariableGraph:this.baseURL+"/variable/replaceVariableGraph"
        }    }

    constructor(jwt: string, organizationId: mongoose.Types.ObjectId) {
        this.jwt = jwt;
        this.organizationId = organizationId;
        this.authHeaders = {
            Authorization: `Bearer ${this.jwt}`,
            ['x-organization-id']: this.organizationId.toString()
        }
    }


    attachment = {
        getAttachmentByGID: async (GID: string) => {
            const response = await axios.get(`${this.urlMap.attachment.getAttachmentByGID}?GID=${GID}`, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        postAttachmentToTask: async (taskGID: string, attachmentURL: string, fileName: string) => {
            const response = await axios.post(this.urlMap.attachment.postAttachmentToTask, {
                taskGID: taskGID,
                attachmentURL: attachmentURL,
                fileName: fileName
            }, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        }
    }

    project = {
        getProjectByGID: async (projectGID: string) => {
            const response = await axios.get(`${this.urlMap.project.getProjectByGID}?projectGID=${projectGID}`, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        saveAllProjectsInWorkspace: async () => {
            const response = await axios.post(`${this.urlMap.project.saveAllProjectsInWorkspace}`, {}, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        getProjectsByTypeAhead: async (projectName: string) => {
            const response = await axios.get(`${this.urlMap.project.getProjectsByTypeAhead}?projectName=${projectName}`, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        createProjectFromProjectTemplate: async (projectName: string, projectTemplateGID: string, projectType: ProjectTypes) => {
            const response = await axios.post(this.urlMap.project.createProjectFromProjectTemplate, {
                projectName: projectName,
                projectTemplateGID: projectTemplateGID,
                projectType: projectType
            }, {
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
            const response = await axios.post(this.urlMap.task.createSubTask, {
                parentTaskGID: parentTaskGID,
                subTaskData: subTaskData
            }, {
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
        },
        setParentForTask:async (taskGID:string,parentTaskGID:string,insertBefore?:string,insertAfter?:string)=>{
            const response = await axios.put(this.urlMap.task.setParentForTask, {
                taskGID: taskGID,
                parentTaskGID: parentTaskGID,
                insertBefore: insertBefore,
                insertAfter: insertAfter
            }, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }

        },
        getAllTasksInProject:async (projectGID:string)=>{
            const response = await axios.get(`${this.urlMap.task.getAllTasksInProject}?projectGID=${projectGID}`, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        }
    }

    story = {

        getAllStoriesForTask: async (taskGID: string) => {
            const response = await axios.get(`${this.urlMap.story.getAllStoriesFromATask}?taskGID=${taskGID}`, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        postStoryOnTask: async (taskGID: string, text: string, htmlText?: string, isPinned: boolean = false) => {
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
        updateStoryOnTask: async (storyGID: string, text: string, htmlText?: string) => {
            const response = await axios.put(this.urlMap.story.updateStoryOnTask, {
                storyGID: storyGID,
                text: text,
                htmlText: htmlText,
            }, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        postNotificationOnTask: async (taskGID: string, key: string, replacements?: any, isPinned: boolean = false) => {
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
        updateNotificationOnTask: async (storyGID: string, key: string, replacements?: any) => {
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
    section = {
        getSectionsInProject: async (projectGID: string) => {
            const response = await axios.get(`${this.urlMap.section.getSectionsInProject}?projectGID=${projectGID}`, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        createSectionInProject: async (projectGID: string, sectionName: string, insertBefore?: string, insertAfter?: string) => {
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
    customfield = {
        getCustomFieldSettingsForProject: async (projectGID: string) => {
            const response = await axios.get(`${this.urlMap.customfield.getCustomFieldSettingsForProject}?projectGID=${projectGID}`, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        getCustomFieldsByTypeAhead: async (customFieldName: string) => {
            const response = await axios.get(`${this.urlMap.customfield.getCustomFieldsByTypeAhead}?customFieldName=${customFieldName}`, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        },
        getCustomFieldByGID: async (customFieldGID: string) => {
            const response = await axios.get(`${this.urlMap.customfield.getCustomFieldByGID}?customFieldGID=${customFieldGID}`, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        }
    }
    command={
        getAllCommands:async ()=>{
            const response = await axios.get(this.urlMap.command.getAllCommands, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        }
    }
    eventFilter={
        getAllEventFilters:async ()=> {
            const response = await axios.get(this.urlMap.eventFilter.getAllEventFilters, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        }
    }
    variable={
        replaceVariableGraph:async (text: string, sourceTaskGID: string)=> {
            const response = await axios.post(this.urlMap.variable.replaceVariableGraph, {
                text: text,
                sourceTaskGID: sourceTaskGID
            }, {
                headers: {...this.authHeaders}
            });
            if (response) {
                return response.data;
            }
        }
    }

    createException = async (cloudmateException: CloudmateException, triggerID: mongoose.Types.ObjectId, sourceTaskGID: string, parentTaskGID?: string, useSimone: boolean = false, uncompleteSource: boolean = false, throwInAsana: boolean = true) => {
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
            uncompleteSourceTask: uncompleteSource,
            throwInAsana: throwInAsana
        };
        await axios.post(`${this.urlMap.exception.createException}`, data, {
            headers: {...this.authHeaders},

        })
    }
}