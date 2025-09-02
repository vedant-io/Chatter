import mongoose from "mongoose";

export const connectDb = async () => {
  const uri =
    "mongodb+srv://vedantd004:802282@cluster0.ck3u6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
    const conn = await mongoose.connect(uri);
    console.log(`Connected to MongoDB server: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to MongoDB server: ${error}`);
  }
};
