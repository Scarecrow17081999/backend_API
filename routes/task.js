import express from "express";
import {
  newTask,
  getMyTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.js";
import { isAuthennicated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/newtask", isAuthennicated, newTask);
router.get("/mytasks", isAuthennicated, getMyTasks);
router
  .route("/:id")
  .put(isAuthennicated, updateTask)
  .delete(isAuthennicated, deleteTask);

export default router;
