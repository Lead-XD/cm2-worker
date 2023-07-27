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
            postStoryOnTask: this.baseURL + "/task/postStoryOnTask"
        },
        project: {},
        story: {},
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


    postStoryOnTask = async (taskGID: string, text: string, htmlText?: string, isPinned: boolean = false) => {
        const response = await axios.post(this.urlMap.task.postStoryOnTask, {
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
    }

    getTask = async (taskGID: string) => {

        const response = await axios.get(`${this.urlMap.task.getTask}?taskGID=${taskGID}`, {
            headers: {...this.authHeaders}
        });
        if (response) {
            return response.data;
        }
    }
    updateTask = async (taskGID: string, data: any) => {
        const response = await axios.put(this.urlMap.task.updateTask, {gid: taskGID, ...data}, {
            headers: {...this.authHeaders}
        });
        if (response) {
            return response.data;
        }
    }
    updateTasksBatch = async (tasksData: any) => {
        const response = await axios.put(this.urlMap.task.updateTaskBatch, {tasks: tasksData}, {
            headers: {...this.authHeaders}
        });
        if (response) {
            return response.data;
        }
    }
    addTaskToProject = async (taskGID: string, projectGID: string) => {
        const response = await axios.put(this.urlMap.task.addTaskToProject, {
            taskGID: taskGID,
            projectGID: projectGID
        }, {
            headers: {...this.authHeaders}
        });
        if (response) {
            return response.data;
        }
    }
    removeTaskFromProject = async (taskGID: string, projectGID: string) => {
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
            uncompleteSource: uncompleteSource
        };
        await axios.post(`${this.urlMap.exception.createException}`, data, {
            headers: {...this.authHeaders},

        })
    }
}
