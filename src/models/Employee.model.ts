import mongoose from "mongoose";
import {EmployeeDocumentInterface} from "../interfaces/employee.interface";
import connectToCM2DB from "../config/database.config";


export interface EmployeeDocument extends mongoose.Document, EmployeeDocumentInterface {
    _id: mongoose.Types.ObjectId;
};

const employeeSchema = new mongoose.Schema<EmployeeDocument>(
    {
        userGID: {
            type: String,
            unique: true,
            null:true
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
const cm2DBConnection = connectToCM2DB(process.env.CM2_MONGODB_URI!)
try {
    Employee = cm2DBConnection.model("Employee");
} catch (e) {
    Employee = cm2DBConnection.model<EmployeeDocument>("Employee", employeeSchema);
}

export default Employee as mongoose.Model<EmployeeDocument>;