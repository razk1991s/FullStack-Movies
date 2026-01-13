// routers/authRouter.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

router.post("/login", async (req, res) => {
  try {
    // תמיכה בשמות שונים מצד ה‑frontend
    const username = req.body.UserName || req.body.username;
    const password = req.body.Password || req.body.password;

    console.log("login body normalized:", { username, password });

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "UserName and Password required" });
    }

    const user = await User.findOne({ UserName: username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.Password) {
      return res.status(403).json({ message: "Account not activated" });
    }

    const match = await bcrypt.compare(password, user.Password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const usersJsonPath = path.join(__dirname, "..", "data", "users.json");
    const permissionsJsonPath = path.join(
      __dirname,
      "..",
      "data",
      "permissions.json"
    );

    let userJson = null;
    let permissions = [];

    try {
      const usersArr = JSON.parse(fs.readFileSync(usersJsonPath, "utf8"));
      userJson = usersArr.find((u) => u.id === user._id.toString());

      const permissionsArr = JSON.parse(
        fs.readFileSync(permissionsJsonPath, "utf8")
      );
      const permObj = permissionsArr.find((p) => p.id === user._id.toString());
      permissions = permObj ? permObj.permissions : [];
    } catch (err) {
      console.error("Error reading JSON files:", err);
    }

    const token = jwt.sign(
      {
        id: user._id,
        UserName: username,
        permissions,
        loginTime: Date.now(),
        sessionTimeOut: userJson?.sessionTimeOut || 30,
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      token,
      user: { id: user._id, UserName: username, ...userJson, permissions },
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
