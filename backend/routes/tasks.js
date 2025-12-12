// backend/routes/tasks.js

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

// GET tasks with optional search + status filter
router.get("/", auth, async (req, res) => {
  const { search, status } = req.query;
  const query = { user: req.user.id };

  if (status && status !== "all") {
    query.status = status;
  }

  if (search && search.trim()) {
    query.title = { $regex: search.trim(), $options: "i" };
  }

  try {
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (err) {
    console.error("GET /tasks error:", err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// CREATE task
router.post(
  "/",
  auth,
  [body("title").notEmpty().withMessage("Title is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status } = req.body;

    try {
      const task = await Task.create({
        user: req.user.id,
        title,
        description: description || "",
        status: status || "pending",
      });

      return res.status(201).json(task);
    } catch (err) {
      console.error("POST /tasks error:", err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

// UPDATE task
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Task not found" });
    }

    return res.json(updated);
  } catch (err) {
    console.error("PUT /tasks/:id error:", err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// DELETE task
router.delete("/:id", auth, async (req, res) => {
  try {
    // 1. Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid task id format" });
    }

    // 2. Delete only if it belongs to this user
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Task not found" });
    }

    return res.json({ msg: "Task removed" });
  } catch (err) {
    console.error("DELETE /tasks/:id error:", err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
