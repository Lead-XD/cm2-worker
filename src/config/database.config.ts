import mongoose from "mongoose";

const connectToMongoDB = async (mongoUrl: string): Promise<void> => {
  try {
    await mongoose.connect(mongoUrl, {
      maxPoolSize: 10,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectToMongoDB;