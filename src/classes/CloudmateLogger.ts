import mongoose from "mongoose";
import {createLogger, format, transports} from 'winston';
import 'winston-mongodb';
import clc from 'cli-color';
import {colors, logLevels} from "../constants/logs.constants";


const combine = format.combine;
const timestamp = format.timestamp;
const splat = format.splat;
const colorize = format.colorize;
const printf = format.printf;
const logLevel = process.env.LOG_LEVEL || "verbose";


export class CloudmateLogger {
    triggerDocument: mongoose.Types.ObjectId;
    logger;

    constructor(triggerDocument: mongoose.Types.ObjectId) {
        this.triggerDocument = triggerDocument;
        this.logger = createLogger({
            transports: [
                new transports.MongoDB({
                    level: logLevel,
                    format: format.json(),
                    db: process.env.CM2_MONGODB_URI as string,
                    collection: "logs",
                }),
                new transports.Console({
                    level: logLevel,
                    format: combine(
                        splat(),
                        timestamp(),
                        colorize(),
                        printf((info) => {
                            const color = colors[info.level] || clc.white;
                            return `${color(info.timestamp)}-${color(info.level)}-${color(
                                info.message
                            )}`;
                        })
                    ),
                }),
            ]
        });
    }
    log(level: logLevels, message: string, meta?: any) {
        message = `${this.triggerDocument}-${message}`;
        this.logger.log(level, message, meta);
    }
}