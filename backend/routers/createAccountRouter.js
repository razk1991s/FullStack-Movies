const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/", async (req, res) => {
  const { UserName, Password } = req.body;

  if (!UserName || !Password) {
    return res.status(400).json({ message: "UserName and Password required" });
  }

  const user = await User.findOne({ UserName });

  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  if (user.Password) {
    return res.status(400).json({ message: "User already has a password" });
  }

  user.Password = Password;
  await user.save();

  res.json({ message: "Account created successfully" });
});

module.exports = router;
