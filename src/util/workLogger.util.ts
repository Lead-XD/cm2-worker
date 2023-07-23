import {logQueue} from "../config/bullMQ.config";
import {
    jobsForLogsWorker,
    workExecStatus,
    workType
} from "../constants/logs.constants";
import {workLogDocumentInterface} from "../interfaces/logs.interface";


export const functionIntercept = {
    apply: function (target: any, thisArg: any, argumentsList: any) {
        try {
            if (argumentsList.length > 0) {
                if (argumentsList[0] && argumentsList[0].trigger.id && argumentsList[0].trigger.type) { // check if context is passed;
                    const workLogData:workLogDocumentInterface = {
                            name: target.name,
                            startTime: new Date(),
                            trigger: argumentsList[0].trigger,
                            workType: workType.function,
                            status: workExecStatus.processing,
                    }
                    const data = {
                      queueData:workLogData,
                    };
                    logQueue.add(jobsForLogsWorker.log, data, {
                        removeOnComplete: true,
                        removeOnFail: true
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }
        } finally {
            return target(...argumentsList);
        }
    },
};
export const objectIntercept = {
    get: function (target: any, name: string, receiver: any): any {
        if (target.hasOwnProperty(name)) {
            if (typeof target[name] === "function") {
                if (target['trigger']) {
                    const workLogData:workLogDocumentInterface = {
                            name: target.name,
                            startTime: new Date(),
                            trigger: target['trigger'],
                            workType: workType.function,
                            status: workExecStatus.processing,
                    }
                    const data = {
                      queueData:workLogData,
                    };

                    logQueue.add(jobsForLogsWorker.log, data, {
                        removeOnComplete: true,
                        removeOnFail: true
                    }).catch((err) => {
                        console.log(err);
                    });
                }
                return function (...args:any[]) {
                    return target[name](...args);
                };
            } else {
                return target[name];
            }
        }
        return Reflect.get(target, name, receiver);
    }
}


