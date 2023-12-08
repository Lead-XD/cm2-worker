import mongoose, {Connection} from "mongoose";


export let cm2DBConnection: Connection | undefined;
const connectToCM2DB = (mongoUrl: string) => {
    try {
        if (!cm2DBConnection)
            cm2DBConnection = mongoose.createConnection(mongoUrl, {
                maxPoolSize: 10,
            });
        return cm2DBConnection;
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
};

export default connectToCM2DB;