const Task = require("../models/task.models");

async function createTask(req, res) {
  try {
    const { title, description, priority } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const task = new Task({
      title,
      description,
      priority,
      userId: req.user.userId,
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Task creation failed" });
  }
}

async function getTask(req, res) {
  try {
    const search = req.query.search || "";

    const tasks = await Task.findByUser(req.user.userId, search);

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
}

async function UpdateTask(req, res) {
  try {
    const { taskId } = req.params;

    const result = await Task.update(taskId, req.user.userId, req.body);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json({ message: "Task update failed" });
  }
}

async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;

    const result = await Task.delete(taskId, req.user.userId);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Task deletion failed" });
  }
}

module.exports = { createTask, getTask, UpdateTask, deleteTask };
