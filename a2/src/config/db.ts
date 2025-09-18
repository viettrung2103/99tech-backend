import mongoose from "mongoose";
import config from "../utils/config";

const connectDB = async (): Promise<void> => {
  try {
    if (!config.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    const conn = await mongoose.connect(config.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
