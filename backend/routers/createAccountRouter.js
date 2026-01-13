// src/routers/createAccountRouter.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const SALT_ROUNDS = 12;

router.post("/", async (req, res) => {
  try {
    const { UserName, Password } = req.body;

    if (!UserName || !Password) {
      return res
        .status(400)
        .json({ success: false, error: "UserName and Password required" });
    }

    if (typeof Password !== "string" || Password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ UserName });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "UserName not found" });
    }

    if (user.status === "active" || user.Password) {
      return res
        .status(409)
        .json({ success: false, error: "Account already activated" });
    }

    const hash = await bcrypt.hash(Password, SALT_ROUNDS);
    user.Password = hash;
    user.status = "active";
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password set. Please login." });
  } catch (err) {
    console.error("create-account error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
