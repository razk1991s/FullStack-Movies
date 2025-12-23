const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const {
  authenticateToken,
  authorize,
} = require("../middleware/authMiddleware");

// ------------------------------------------------------
// GET all users
// ------------------------------------------------------
router.get(
  "/",
  authenticateToken,
  authorize("Manage Users"),
  async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// ------------------------------------------------------
// GET user by ID
// ------------------------------------------------------
router.get(
  "/:id",
  authenticateToken,
  authorize("Manage Users"),
  async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// ------------------------------------------------------
// CREATE user
// ------------------------------------------------------
router.post(
  "/",
  authenticateToken,
  authorize("Manage Users"),
  async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// ------------------------------------------------------
// UPDATE user
// ------------------------------------------------------
router.put(
  "/:id",
  authenticateToken,
  authorize("Manage Users"),
  async (req, res) => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// ------------------------------------------------------
// DELETE user
// ------------------------------------------------------
router.delete(
  "/:id",
  authenticateToken,
  authorize("Manage Users"),
  async (req, res) => {
    try {
      const result = await userService.deleteUser(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
