const express = require('express');
const router = express.Router();
const userRepo = require('../repository/dbUserRepo');

// GET all users
router.get('/', async (req, res) => {
  const users = await userRepo.getAllUsers();
  res.json(users);
});

// GET user by id
router.get('/:id', async (req, res) => {
  const user = await userRepo.getUserById(req.params.id);
  res.json(user);
});

// POST create user
router.post('/', async (req, res) => {
  const newUser = await userRepo.createUser(req.body);
  res.json(newUser);
});

// PUT update user
router.put('/:id', async (req, res) => {
  const updatedUser = await userRepo.updateUser(req.params.id, req.body);
  res.json(updatedUser);
});

// DELETE user
router.delete('/:id', async (req, res) => {
  await userRepo.deleteUser(req.params.id);
  res.json({ message: 'User deleted' });
});

module.exports = router;
