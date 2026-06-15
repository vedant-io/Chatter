import "dotenv/config";
import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const PORT = process.env.PORT || 5000;
//test
const __dirname = path.resolve();

const allowedOrigins =
  process.env.CORS_ORIGINS?.split(",").map((o) => o.trim()) || [];

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      // and requests from allowed origins.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // Instead of throwing an error which crashes the server,
      // we pass false to reject the origin gracefully.
      callback(null, false);
    },
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
