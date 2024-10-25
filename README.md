# CM2 Worker

This repository contains a Node.js worker boilerplate that follows the Express.js-like architecture. The worker is designed to start a server on a queue and register different jobs for execution.

## Prerequisites

Before running the worker, make sure you have the following prerequisites installed:

- Node.js
- Redis
- MongoDB

## Installation

1. **npm i cm2-worker** or **use yarn add cm2-worker**

2. Make sure you have a .env file in the root directory of your project. The .env file should contain the following variables:
   1. **REDIS_COMMAND_QUEUE** - the name of the queue on which the worker will listen for jobs
   2. **WORKER_TOKEN_SECRET** - the jwt token for authenticating the worker with 
      CM2 openapi
   3. **CM2_MONGODB_URI** - the URI of the CM2 MongoDB database
   4. **REDIS_URL** - the URL of the Redis database
   5. **CLOUDMATE2_BASE_API_URL** - Cloudmate2 openapi url
   6. **LOG_LEVEL** - the log level of the worker. The default log level is 
      'verbose' if not defined in .env. To see all log levels import logLevels 
      from the cm2-worker. Following log levels are available:
      - error
      - warn
      - info
      - http
      - verbose
      - debug
      - silly
3. Make sure the relevant commands and workers are setup inside CM2 using 
   CM2 API. 

   
## Usage

To start the worker and execute the registered jobs, create instance of the 
CloudmateWorker class. Register the jobs you want to execute using the 
register method and finally call the initiate method to start the worker. 

## Code Sample

Here's a code sample illustrating how to register jobs for the worker:

```typescript
require('dotenv').config({ path: ".env" }); //for loading .env file
import {CloudmateWorker,CommandContext, CommandExecutionData} from "cm2-worker"; //importing the worker class

const cloudmateWorker = new CloudmateWorker(
    process.env.REDIS_COMMAND_QUEUE!, // name of the queue on which the worker will listen for jobs
    process.env.WORKER_TOKEN_SECRET!, // the jwt token for authenticating the worker with CM2 openapi
    process.env.CM2_MONGODB_URI!, // the URI of the CM2 MongoDB database
    process.env.REDIS_URL!, // the URL of the Redis database
);

const foo = async (commandCTX: CommandContext,data:CommandExecutionData) => {
    try{
        
    }catch (e) {
        //after you catch the error you can throw it again to be logged in CM2
        throw e;
    }
}

cloudmateWorker.register('jobname', foo); //registering a job

cloudmateWorker.initiate(); //starting the worker
```

## Exception Handling
This part explain how can you handle exceptions in your code and how to log 
them in CM2. The worker can pass all exceptions to CM2 for 
logging and notification given the thrown exception is an instance of 
CloudmateException.

```typescript
import {
    CloudmateException,
    CloudmateExceptionMetaDataTypes,
    CommandContext,
    CommandExecutionData, 
    UnknownException
} from "cm2-worker";

export const vismaWorker = async (commandCTX: CommandContext, data: CommandExecutionData) => {
    try {
        //something goes when creating client in visma
        throw new CloudmateException({
            name: "Error occurred while creating visma client",
            message: "message from visma",
            description: "description from visma error",
            metaData: {
                ref: "some ref for identification",
                type: CloudmateExceptionMetaDataTypes.visma,
                data: {} // meta data,
            },
            statusCode: 500,
            parentTaskGID: "some task gid",
            sourceTaskGID: "some task gid",
            uncompleteSourceTask: true,
            userSimone: false,
            notificationTextData: {
                notificationKey: 'local key',
                notificationReplacements: {
                    "replacement": "value",
                }
            }
        });
    } catch (e) {
        if (e instanceof CloudmateException) {
            throw e;
        } else {
            throw new UnknownException({
                name: 'Unknown exception occurred while doing',
                description: e.message,
                metaData: {
                    type: CloudmateExceptionMetaDataTypes.visma,
                    ref: 'Add any ref if present',
                    data: {}
                },
                notificationTextData: {
                    notificationKey: 'local key',
                    notificationReplacements: {
                        "replacement": "value",
                    }
                }
            }, e);
        }
    }
}
```

You need to check if there is an exception that is not CloudmateException 
than you need to throw instance of UnknownException and throw it. The 
UnknownException is also a CloudmateException (parent class) so it will be 
logged in CM2.

You can create your own exception class that extends CloudmateException.

```typescript
class UnknownException extends CloudmateException {
    constructor(cloudmateExceptionObj:CloudmateExceptionType,exception:any){
        super(cloudmateExceptionObj);
        this.type = CloudmateExceptionTypes.unknown;
        if(exception){
            this.name = exception.name;
            this.message = exception.message;
            this.statusCode = 500;
            this.stack = exception.stack;
            this.exceptionErrors = [];
        }
    }
}
```

## Work Logging
The worker can also log the functions that are executed inside the worker.

### Logging Functions Individually

To log the function you need to wrap the function in the proxy function and 
the first argument of the function must be of type Context otherwise it will 
not be logged.

```typescript
import {
    CommandContext,
    CommandExecutionData, 
    functionIntercept,
    Context
} from "cm2-worker";

const someFunction_ = async (ctx:Context,arg1:any,arg2:any) => {
    //some code
}
const someFunction:typeof someFunction_ = new Proxy(someFunction_,functionIntercept)

export const foo = async (commandCTX: CommandContext, data:CommandExecutionData) => {
    someFunction(commandCTX.trigger,1,2) //will be logged as work in CM2 mongodb
}
```

### Logging Function Members of Class
To log the function members of class you need to wrap the class in the proxy.
The class should contain a trigger property of type Context otherwise class 
functions will not be logged.

```typescript
class SomeClass_ {
    trigger:Context|undefined;
    
    prop1:any;
    prop2:any;
    constructor(prop1:any,prop2:any) {
        this.prop1 = prop1;
        this.prop2 = prop2
    }
    function1=(arg1:any)=>{
        //some stuff
    }

    function2 =(arg2:any)=>{
        //some stuff
    }
}

export const SomeClass = (prop1:any,prop2:any):SomeClass_ => {
    const someClassObj = new SomeClass_(prop1,prop2);
    return new Proxy(someClassObj, objectIntercept);
};

export const foo = async (commandCTX: CommandContext, data:CommandExecutionData) => {
    const someClassObj = SomeClass(1,2);
    someClassObj.trigger = commandCTX.trigger;
    
    someClassObj.function1(1); //will be logged as work in CM2 mongodb
}
```

## Process Logging
The package provides a logger class that can be used to log the process of the worker. The logs are printed on the CLI and in CM2 MongoDB in the 'logs' collection.

The logger class object is provided by the cm2-worker through the commandCTX object 'commandCTX.cloudmateLogger'.

```typescript
commandCTX.cloudmateLogger.log(logLevels.info, 'Starting execution');
```

### Log Levels
The log level can be configured in the .env file using LOG_LEVEL variable. The default log level is 'verbose' if not defined in .env.

To see all log levels import logLevels from the cm2-worker. Following log levels are available:

```typescript
import {
    logLevels,
} from "cm2-worker";

//error
//warn
//info
//http
//verbose
//debug
//silly
```

The logs are saved in the logs collection with following properties:
* timestamp
* level
* message

The message is a string and has a format of 'triggerDocumentId-string' 

## Available APIs through Cloudmate2API

The Cloudmate2API class provides comprehensive endpoints for interacting with Asana:

### Task Operations
```typescript
const api = new Cloudmate2API(jwt, organizationId);

// Task CRUD
await api.task.getTask(taskGID);
await api.task.updateTask(taskGID, taskData);
await api.task.createTask(data);
await api.task.createSubTask(parentTaskGID, subTaskData);

// Task Project Management
await api.task.addTaskToProject(taskGID, projectGID);
await api.task.removeTaskFromProject(taskGID, projectGID);
await api.task.setParentForTask(taskGID, parentTaskGID, insertBefore, insertAfter);
```

### Project Operations
```typescript
// Project Management
await api.project.getProjectByGID(projectGID);
await api.project.saveAllProjectsInWorkspace();
await api.project.getProjectsByTypeAhead(projectName);
await api.project.createProjectFromProjectTemplate(projectName, templateGID, projectType);
```

### Story & Comments
```typescript
// Stories
await api.story.getAllStoriesForTask(taskGID);
await api.story.postStoryOnTask(taskGID, text, htmlText, isPinned);
await api.story.updateStoryOnTask(storyGID, text, htmlText);
await api.story.postNotificationOnTask(taskGID, key, replacements, isPinned);
```

### Sections
```typescript
// Section Management
await api.section.getSectionsInProject(projectGID);
await api.section.createSectionInProject(projectGID, sectionName, insertBefore, insertAfter);
await api.section.addTaskToSection(taskGID, sectionGID, insertBefore, insertAfter);
```

### Custom Fields
```typescript
// Custom Field Operations
await api.customfield.getCustomFieldSettingsForProject(projectGID);
await api.customfield.getCustomFieldsByTypeAhead(customFieldName);
await api.customfield.getCustomFieldByGID(customFieldGID);
```

### Attachments
```typescript
// Attachment Handling
await api.attachment.getAttachmentByGID(GID);
await api.attachment.postAttachmentToTask(taskGID, attachmentURL, fileName);
```

## Available Models

The package provides Mongoose models for various entities:

```typescript
import { models } from 'cm2-worker';

// AI Models
const AIThread = models.AIThread;  // For AI conversation threads

// Asana Models
const AsanaComment = models.AsanaComment;  // For Asana comments
const AsanaEvent = models.AsanaEvent;    // For Asana events
const AsanaProject = models.AsanaProject; // For Asana projects
const AsanaTask = models.AsanaTask;      // For Asana tasks
const AsanaUser = models.AsanaUser;      // For Asana users

// Command Models
const Command = models.Command;          // For command definitions
const ExecutedCommand = models.ExecutedCommand; // For command execution records

// Other Models
const Employee = models.Employee;        // For employee records
const EventFilter = models.EventFilter;  // For event filtering
const Project = models.Project;          // For project management
const Worker = models.Worker;            // For worker definitions
```

## Constants and Enums

The package provides various constants and enums for type safety:

```typescript
// Asana Related
import { AsanaResourceTypes } from 'cm2-worker';  // Types of Asana resources
import { ProjectTypes } from 'cm2-worker';        // Types of projects

// Command Related
import { CommandStatus, CommandExecStatus } from 'cm2-worker';  // Command statuses

// Channel Related
import { ChannelStatus } from 'cm2-worker';       // Channel statuses
import { EmailProviders } from 'cm2-worker';      // Email provider types

// Event Related
import { EventSources, EventFilterTypes } from 'cm2-worker';  // Event sources and filter types

// Exception Related
import { CloudmateExceptionTypes, CloudmateExceptionMetaDataTypes } from 'cm2-worker';

// User Related
import { userTypes, userInviteStatus } from 'cm2-worker';

// Variable Related
import { VariableTypes } from 'cm2-worker';
```

## Available Interfaces

The package provides TypeScript interfaces for type safety and better development experience:

### Core Interfaces
```typescript
// Command and Worker Interfaces
import { CommandContext, CommandExecutionData, WorkFunction } from 'cm2-worker';

// Context interface for logging
interface Context {
    triggerDocument: ExecutedCommandDocument;
    triggerType: workTriggerType;
}

// Job Data interface
interface JobData {
    commandId: mongoose.Types.ObjectId;
    organizationId: mongoose.Types.ObjectId;
    appId: mongoose.Types.ObjectId;
    workspaceGID: string;
    projectDocument: ProjectDocument;
    asanaTaskDocument: AsanaTaskDocument;
    eventDocument: AsanaEventDocument;
    executedCommandDocument: ExecutedCommandDocument;
    resource: any;
    workerId: mongoose.Types.ObjectId;
    cloudmateUser: UserDocumentInterface;
    ownerUser: UserDocumentInterface;
    configurationsInstance: any;
    asanaUserDocument?: AsanaUserDocument;
}
```

### Asana Related Interfaces
```typescript
// Asana Resource Interface
interface AsanaResourceInterface {
    gid: string;
    resourceType: string;
    name: string;
}

// Asana Task Interface
interface AsanaTaskDocumentInterface {
    gid: string;
    resourceType: string;
    name: string;
    resourceSubtype: string;
    completed: boolean;
    // ... other task properties
    customFields: CustomField[];
    attachments: Attachment[];
}

// Asana User Interface
interface AsanaUserDocumentInterface {
    gid: string;
    resourceType: AsanaResourceTypes;
    name: string;
    email: string;
    photo: {
        image21x21: string;
        // ... other image sizes
    };
    workspaces: workspace[];
    selectedOrganization: mongoose.Types.ObjectId;
}

// Asana Event Interface
interface asanaEventDocumentInterface {
    receivedAt?: Timestamp;
    updatedAt?: Timestamp;
    user: gidResourceType;
    resource?: gidResourceTypeSubType;
    parent?: gidResourceTypeSubType;
    // ... other event properties
}
```

### Project and Channel Interfaces
```typescript
// Project Interface
interface ProjectDocumentInterface {
    app: mongoose.Types.ObjectId;
    workspaceGID: string;
    projectGID: string;
    teamGID: string;
    name: string;
    projectType: ProjectTypes;
    messageDetails: ChannelDetails;
    variables: ProjectVariable[];
    commands: {
        id: mongoose.Types.ObjectId | CommandDocument;
        status: CommandStatus;
        configurationsInstance?: any;
        projectFilters?: [any];
    }[];
    // ... other project properties
}

// Channel Interface
interface ChannelDetails {
    sms: SMSChannelDetails;
    email: EmailChannelDetails;
}

interface EmailChannelDetails extends MessageChannelDetails {
    emailAddress: string;
    provider: EmailProviders;
    signatureImageURL?: string;
}

interface SMSChannelDetails extends MessageChannelDetails {
    phoneNumber: string;
}
```

### Exception Interfaces
```typescript
interface CloudmateExceptionInterface {
    organization?: mongoose.Types.ObjectId;
    name?: string;
    message?: string;
    description?: string;
    statusCode?: number;
    metaData?: CloudmateExceptionMetaData;
    sourceTaskGID: string;
    uncompleteSourceTask?: boolean;
    useSimone?: boolean;
    throwInAsana?: boolean;
    source?: ExceptionSources;
}

interface CloudmateExceptionMetaData {
    type: CloudmateExceptionMetaDataTypes;
    ref?: String;
    data?: any;
}
```

### Other Interfaces
```typescript
// Employee Interface
interface EmployeeDocumentInterface {
    userGID: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    employeeProjectGID: string;
    employeeRecordTaskGID: string;
    app: mongoose.Types.ObjectId;
}

// Event Filter Interface
interface EventFilterDocumentInterface {
    name: string;
    description: string;
    filter: { [key: string]: string };
    eventSource: EventSources;
    filterType: EventFilterTypes;
    match: string;
}

// Work Log Interface
interface WorkLog {
    name: string;
    startTime: Date;
    endTime?: Date;
    trigger: {
        id: mongoose.Schema.Types.ObjectId;
        type: workTriggerType;
    };
    workType: workType;
    status: workExecStatus;
}
```


## License

This project is licensed under the AGPL License.
