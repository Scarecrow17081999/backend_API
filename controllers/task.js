import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      user: req.user._id,
    });
    res.status(201).json(task);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
