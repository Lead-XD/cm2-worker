import mongoose from "mongoose";
import {EmployeeDocumentInterface} from "../interfaces/employee.interface";


export interface EmployeeDocument extends mongoose.Document, EmployeeDocumentInterface {
    _id: mongoose.Types.ObjectId;
};

const employeeSchema = new mongoose.Schema<EmployeeDocument>(
    {
        userGID: {
            type: String,
            unique: true,
        },
        emailAddress: String,
        firstName: String,
        lastName: String,
        app: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        employeeProjectGID: String,
        employeeRecordTaskGID: String,
    },
    {
        timestamps: true
    }
);

let Employee;

try {
    Employee = mongoose.model("Employee");
} catch (e) {
    Employee = mongoose.model<EmployeeDocument>("Employee", employeeSchema);
}

export default Employee as mongoose.Model<EmployeeDocument>;