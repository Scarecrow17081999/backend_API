import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";
export const newTask = async (req, res, next) => {
  const { title, description, isCompleted } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      isCompleted,
      user: req.user,
    });
    if (!task)
      return next(new ErrorHandler("Error Cannot create the task", 401));
    res.status(201).json({
      succes: true,
      message: "Task added successfully",
      taskName: task,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user });

    if (!tasks.length) {
      return next(
        new ErrorHandler("Task is Empty Please add something...", 404)
      );
    }
    res.status(200).json({
      succes: true,
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Task not found", 404));
    task.isCompleted = !task.isCompleted;
    task.save();
    res.status(200).json({
      succes: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id, { new: true });
    if (!task) return next(new ErrorHandler("Task not found", 404));
    res.status(200).json({
      succes: true,
      message: "Task deleted successfully",
      task,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};
