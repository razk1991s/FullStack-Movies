const Member = require('../models/memberModel');

const getAllMembers = () => Member.find();
const getMemberById = (id) => Member.findById(id);
const createMember = (data) => Member.create(data);
const updateMember = (id, data) => Member.findByIdAndUpdate(id, data, { new: true });
const deleteMember = (id) => Member.findByIdAndDelete(id);

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
};
