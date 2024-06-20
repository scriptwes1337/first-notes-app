const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Task = require("../models/Task");
const User = require("../models/User");
const mongoose = require("mongoose");

router.get("/all", async (req, res) => {
  try {
    const data = await User.find().populate("tasks");
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, name, password } = req.body;

    if (username.length < 3) {
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters long." });
    }

    if (name === "") {
      return res.status(400).json({ error: "Please fill in your name." });
    }

    if (password.length < 3) {
      return res
        .status(400)
        .json({ error: "Password must be at least 3 characters long." });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username taken, try another username." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      name,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ error: "Oops! This user doesn't exist..." });
    }

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!correctPassword) {
      return res.status(400).json({
        error: "Invalid password. Thou shalt not pass the gates of login!",
      });
    }

    const userForToken = {
      username: existingUser.username,
      name: existingUser.name,
      id: existingUser.id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(200).json({
      token,
      username: existingUser.username,
      name: existingUser.name,
      id: existingUser.id,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ error: "Token is missing." });
    }

    const isValidToken = jwt.verify(token, process.env.SECRET);
    res.status(200).json(isValidToken);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
