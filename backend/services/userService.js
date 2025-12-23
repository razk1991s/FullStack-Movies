const userRepo = require('../repository/dbUserRepo');

const getAllUsers = async () => userRepo.getAllUsers();
const getUserById = async (id) => userRepo.getUserById(id);
const getUserByUserName = async (userName) => userRepo.getUserByUserName(userName);
const createUser = async (data) => userRepo.createUser(data);
const updateUser = async (id, data) => userRepo.updateUser(id, data);
const deleteUser = async (id) => userRepo.deleteUser(id);

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUserName,
  createUser,
  updateUser,
  deleteUser
};
