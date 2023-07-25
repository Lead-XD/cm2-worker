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
    CommandExecutionData, UnknownException
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
            throw  new UnknownException({
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
than you need to throw instance of  UnknownException and throw it. The 
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
    CommandExecutionData, functionIntercept,Context
} from "cm2-worker";
const someFunction_ = async (ctx:Context,arg1:any,arg2:any) => {
    //some code
}
const  someFunction:typeof someFunction_ = new Proxy(someFunction_,functionIntercept)

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

## License

This project is licensed under the AGPL License.