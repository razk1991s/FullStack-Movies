const Member = require("../models/memberModel");
const Subscription = require("../models/subscriptionModel");

const getAllMembers = () => Member.find();

const getMemberById = (id) => Member.findById(id);

const createMember = (data) => Member.create(data);

const updateMember = (id, data) =>
  Member.findByIdAndUpdate(id, data, { new: true });

// delete member and their subscriptions
const deleteMember = async (id) => {
  // delete the member
  await Member.findByIdAndDelete(id);

  // delete related subscription
  await Subscription.findOneAndDelete({ MemberId: id });

  return { message: "Member and related subscription removed" };
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
