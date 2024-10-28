import mongoose, {Connection} from "mongoose";


export let cm2DBConnection: Connection | undefined;
const connectToCM2DB = (mongoUrl: string) => {
    try {
        if (!cm2DBConnection)
            cm2DBConnection = mongoose.createConnection(mongoUrl, {
                maxPoolSize: 10,
                connectTimeoutMS: 45000,
                socketTimeoutMS: 45000,
            });
        return cm2DBConnection;
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
};



export async function closeDBConnection() {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
            console.log('MongoDB connection closed');
        }
    } catch (error) {
        console.log('Error closing MongoDB connection');
    }
}



export default connectToCM2DB;