const Member = require("../models/memberModel");
const Subscription = require("../models/subscriptionModel");

// שליפת כל המנויים
const getAllMembers = () => Member.find();

// שליפת מנוי לפי ID
const getMemberById = (id) => Member.findById(id);

// יצירת מנוי חדש
const createMember = (data) => Member.create(data);

// עדכון מנוי
const updateMember = (id, data) =>
  Member.findByIdAndUpdate(id, data, { new: true });

// מחיקת מנוי + מחיקת ה-Subscription שלו
const deleteMember = async (id) => {
  // מחיקת המנוי עצמו
  await Member.findByIdAndDelete(id);

  // מחיקת כל ה-Subscription שלו
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
