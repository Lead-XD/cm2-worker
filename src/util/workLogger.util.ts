import {
    jobsForLogsWorker,
    workExecStatus,
    workType
} from "../constants/logs.constants";
import {WorkLog} from "../interfaces/logs.interface";
import {CloudmateWorker} from "../classes/CloudmateWorker";


export const functionIntercept = {
    apply: function (target: any, thisArg: any, argumentsList: any) {
        try {

            if (argumentsList.length > 0) {
                if (CloudmateWorker.logQueue && argumentsList[0] && argumentsList[0].trigger && argumentsList[0].trigger.triggerDocument && argumentsList[0].trigger.triggerDocument._id && argumentsList[0].trigger.triggerType) {
                    const workLogData:WorkLog = {
                            name: target.name,
                            startTime: new Date(),
                            trigger: {id:argumentsList[0].trigger.triggerDocument._id, type:argumentsList[0].trigger.triggerType},
                            workType: workType.function,
                            status: workExecStatus.processing,
                    }
                    CloudmateWorker.logQueue.add(jobsForLogsWorker.log, workLogData, {
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
                if (CloudmateWorker.logQueue && target['trigger'] && target['trigger'].triggerDocument && target['trigger'].triggerDocument._id && target['trigger'].triggerType){
                    const workLogData:WorkLog = {
                            name: name,
                            startTime: new Date(),
                            trigger: {id:target['trigger'].triggerDocument._id, type:target['trigger'].triggerType},
                            workType: workType.api,
                            status: workExecStatus.processing,
                    }
                    CloudmateWorker.logQueue.add(jobsForLogsWorker.log, workLogData, {
                        removeOnComplete: true,
                        removeOnFail: true,
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


