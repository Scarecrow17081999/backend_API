import express from "express";
export const app = express();
import userRouter from "./routes/routes.js";
import dotEnv from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
//using middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//using router
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", taskRouter);

//using dotenv
dotEnv.config({
  path: "./config.env",
});
