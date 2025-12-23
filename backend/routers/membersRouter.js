const express = require("express");
const router = express.Router();
const memberRepo = require("../repository/dbMemberRepo");
const {
  authenticateToken,
  authorize,
} = require("../middleware/authMiddleware");

// GET all members
router.get(
  "/",
  authenticateToken,
  authorize("View Subscriptions"),
  async (req, res) => {
    const members = await memberRepo.getAllMembers();
    res.json(members);
  }
);

// GET member by id
router.get(
  "/:id",
  authenticateToken,
  authorize("View Subscriptions"),
  async (req, res) => {
    const member = await memberRepo.getMemberById(req.params.id);
    res.json(member);
  }
);

// POST create member
router.post(
  "/",
  authenticateToken,
  authorize("Create Subscriptions"),
  async (req, res) => {
    const newMember = await memberRepo.createMember(req.body);
    res.json(newMember);
  }
);

// PUT update member
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

// DELETE member
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
