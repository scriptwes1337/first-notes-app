const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.get("/all", async (req, res) => {
  try {
    const allTasks = await Task.find().populate("user", { tasks: 0 });
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const requestedId = req.params["id"];
    const requestedUser = await User.findById(requestedId).populate("tasks");
    res.status(200).json(requestedUser.tasks);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/create", async (req, res) => {
  const { name, description, priority, deadline } = req.body;
  try {
    let token;
    const authorization = req.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.replace("Bearer ", "");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "Token invalid." });
    }

    const user = await User.findById(decodedToken.id);

    const task = new Task({
      name,
      description,
      priority,
      deadline,
      user: user.id,
    });

    const savedTask = await task.save();
    await User.findByIdAndUpdate(user.id, { $push: { tasks: savedTask.id } });

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put("/edit/:id", async (req, res) => {
  const { name, description, priority, deadline } = req.body;
  const requestedId = req.params["id"];
  try {
    let token;
    const authorization = req.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.replace("Bearer ", "");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "Token invalid." });
    }

    const taskToUpdate = await Task.findById(requestedId);
    taskToUpdate.name = name;
    taskToUpdate.description = description;
    taskToUpdate.priority = priority;
    taskToUpdate.deadline = deadline;
    const savedTask = await taskToUpdate.save();
    res.status(200).json(savedTask);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const requestedId = String(req.params["id"]);

    const deletedTask = await Task.findByIdAndDelete(requestedId);

    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
module.exports = router;
