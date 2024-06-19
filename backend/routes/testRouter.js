const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const User = require("../models/User");

router.post("/reset", async (req, res) => {
  try {
    await Task.deleteMany();
    await User.deleteMany();
    res.status(204).json({ message: "Database cleared." });
  } catch (error) {
    console.log("Failed to clear database: ", error.message);
  }
});

module.exports = router;
