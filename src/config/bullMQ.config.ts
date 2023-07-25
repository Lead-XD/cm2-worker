import Redis from "ioredis";
import { Queue } from "bullmq";


const connection = process.env.REDIS_URL?new Redis(process.env.REDIS_URL):new Redis(parseInt(process.env.REDIS_PORT as string), process.env.REDIS_HOST as string, { password: process.env.REDIS_PASSWORD,maxRetriesPerRequest: null });


const logQueue = new Queue('cm_log_queue', { connection: connection });

export {logQueue};
