import mongoose from "mongoose";
import dns from "node:dns";

export const connectDB = async () => {
  try {
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch (dnsErr) {
      // Fallback if environment restricts setting DNS
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB is connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};