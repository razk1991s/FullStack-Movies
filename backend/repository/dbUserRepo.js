const User = require('../models/userModel');

const getAllUsers = () => User.find();
const getUserById = (id) => User.findById(id);
const getUserByUserName = (userName) => User.findOne({ UserName: userName });
const createUser = (data) => User.create(data);
const updateUser = (id, data) => User.findByIdAndUpdate(id, data, { new: true });
const deleteUser = (id) => User.findByIdAndDelete(id);

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUserName,
  createUser,
  updateUser,
  deleteUser
};
