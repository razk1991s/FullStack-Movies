// src/models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  UserName: { type: String, required: true, unique: true },
  Password: { type: String }, // אופציונלי עד להפעלה
  status: { type: String, enum: ["pending", "active"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// עדכון updatedAt לפני שמירה
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
