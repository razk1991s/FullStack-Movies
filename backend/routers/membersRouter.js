const express = require("express");
const router = express.Router();
const memberRepo = require("../repository/dbMemberRepo");
const {
  authenticateToken,
  authorize,
} = require("../middleware/authMiddleware");

router.get(
  "/",
  authenticateToken,
  authorize("View Subscriptions"),
  async (req, res) => {
    const members = await memberRepo.getAllMembers();
    res.json(members);
  }
);

router.get(
  "/:id",
  authenticateToken,
  authorize("View Subscriptions"),
  async (req, res) => {
    const member = await memberRepo.getMemberById(req.params.id);
    res.json(member);
  }
);

router.post(
  "/",
  authenticateToken,
  authorize("Create Subscriptions"),
  async (req, res) => {
    const newMember = await memberRepo.createMember(req.body);
    res.json(newMember);
  }
);

router.put(
  "/:id",
  authenticateToken,
  authorize("Update Subscription"),
  async (req, res) => {
    const updatedMember = await memberRepo.updateMember(
      req.params.id,
      req.body
    );
    res.json(updatedMember);
  }
);

router.delete(
  "/:id",
  authenticateToken,
  authorize("Delete Subscriptions"),
  async (req, res) => {
    await memberRepo.deleteMember(req.params.id);
    res.json({ message: "Member deleted" });
  }
);

module.exports = router;
