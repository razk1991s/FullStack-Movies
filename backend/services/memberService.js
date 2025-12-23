const memberRepo = require('../repository/dbMemberRepo');

const getAllMembers = async () => memberRepo.getAllMembers();
const getMemberById = async (id) => memberRepo.getMemberById(id);
const createMember = async (data) => memberRepo.createMember(data);
const updateMember = async (id, data) => memberRepo.updateMember(id, data);
const deleteMember = async (id) => memberRepo.deleteMember(id);

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
};
