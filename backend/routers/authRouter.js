const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

router.post("/login", async (req, res) => {
  const { UserName, Password } = req.body;

  if (!UserName || !Password) {
    return res.status(400).json({ message: "UserName and Password required" });
  }

  const user = await User.findOne({ UserName });

  if (!user || user.Password !== Password) {
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
      UserName,
      permissions,
      loginTime: Date.now(),
      sessionTimeOut: userJson?.sessionTimeOut || 30,
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    token,
    user: { id: user._id, UserName, ...userJson, permissions },
  });
});

module.exports = router;
