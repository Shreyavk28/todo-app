// backend/routes/tasks.js
const express = require("express");
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect); // protect all task routes

// GET /api/tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
});

// POST /api/tasks
router.post("/", async (req, res) => {
  const { title, priority, dueDate } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });

  const task = await Task.create({
    title,
    priority: priority || "Low",
    dueDate: dueDate || null,
    user: req.user._id,
  });
  res.status(201).json(task);
});

// PUT /api/tasks/:id
router.put("/:id", async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Task not found" });
  res.json(updated);
});

// DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  const deleted = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!deleted) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
});

module.exports = router;
