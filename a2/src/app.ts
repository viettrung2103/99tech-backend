import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

import jobRouter from "./routes/jobRouter";
import userRouter from "./routes/userRouter";
import {
  unknownEndpoint,
  errorHandler,
} from "./middleware/customMiddleware";
import connectDB from "./config/db";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

connectDB();

app.use(morgan("dev"));

app.use("/api/jobs", jobRouter);
app.use("/api/users", userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
