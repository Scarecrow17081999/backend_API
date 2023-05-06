import express from "express";
export const app = express();
import userRouter from "./routes/routes.js";
import dotEnv from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
//using middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//using router
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", taskRouter);

//using dotenv
dotEnv.config({
  path: "./config.env",
});
// handling erors
app.use(errorMiddleware);
