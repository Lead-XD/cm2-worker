import mongoose from "mongoose";


export interface EmployeeDocumentInterface {
    userGID:string,
    emailAddress:string,
    firstName:string,
    lastName:string,
    employeeProjectGID:string,
    employeeRecordTaskGID:string,
    app: mongoose.Types.ObjectId;
}