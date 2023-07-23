# Worker Boilerplate

This repository contains a Node.js worker boilerplate that follows the Express.js-like architecture. The worker is designed to start a server on a queue and register different jobs for execution.

## Prerequisites

Before running the worker, make sure you have the following prerequisites installed:

- Node.js
- Redis
- MongoDB

## Installation

1. Clone this repository: git clone <https://github.com/Lead-XD/Worker-Biolerplate.git>

2. Navigate to the cloned directory: cd <directory_name>

3. Install the dependencies:

4. Create a `.env` file and configure the following environment variables:

REDIS_COMMAND_QUEUE=<redis_command_queue>
WORKER_TOKEN_SECRET=<worker_token_secret>
CM2_MONGODB_URI=<cm2_mongodb_uri>
REDIS_PORT=<redis_port>
REDIS_HOST=<redis_host>



## Usage

To start the worker and execute the registered jobs, run the following command: npm start


## Code Sample

Here's a code sample illustrating how to register jobs for the worker:

```javascript
require('dotenv').config({ path: ".env" });
import { CloudmateException } from "./classes/CloudmateException";
import { Cloudmate2API } from "./classes/Cloumdate2API";
import { CloudmateWorker } from "./classes/Woker";
import { jobsForCommandWorker } from "./constants";
import { CloudmateExceptionMetaDataTypes } from "./constants/exception.constants";
import { CommandContext, CommandExecutionData } from "./types/command.interface";

const cloudmateWorker = new CloudmateWorker(
    process.env.REDIS_COMMAND_QUEUE!,
    process.env.WORKER_TOKEN_SECRET!,
    process.env.CM2_MONGODB_URI!,
    +process.env.REDIS_PORT!,
    process.env.REDIS_HOST!
);

export const foo = async (commandCTX: CommandContext, data: CommandExecutionData) => {
    const executedCommandDocument = commandCTX.triggerData.triggerObj;
    const eventDocument = commandCTX.eventObj;
    const cm2Client = new Cloudmate2API(process.env.WORKER_TOKEN_SECRET!, commandCTX.organizationId);
    const task = await cm2Client.getTask(data.taskGID);
    console.log(task);
}

cloudmateWorker.register('job-name-1', foo1);
cloudmateWorker.register('job-name-2', foo2);
cloudmateWorker.register('job-name-3', foo3);

cloudmateWorker.initiate();

```

Feel free to modify the code sample and register additional jobs as needed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.