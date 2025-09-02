import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB server: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to MongoDB server: ${error}`);
  }
};
