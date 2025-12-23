const express = require("express");
const router = express.Router();
const subscriptionRepo = require("../repository/dbSubscriptionRepo");
const {
  authenticateToken,
  authorize,
} = require("../middleware/authMiddleware");

// ------------------------------------------------------
// GET all subscriptions
// ------------------------------------------------------
router.get(
  "/",
  authenticateToken,
  authorize("View Subscriptions"),
  async (req, res) => {
    try {
      const subscriptions = await subscriptionRepo.getAllSubscriptions();
      res.json(subscriptions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// ------------------------------------------------------
// GET subscription by id
// ------------------------------------------------------
router.get(
  "/:id",
  authenticateToken,
  authorize("View Subscriptions"),
  async (req, res) => {
    try {
      const subscription = await subscriptionRepo.getSubscriptionById(
        req.params.id
      );
      res.json(subscription);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// ------------------------------------------------------
// GET movies watched by a specific member
// ------------------------------------------------------
router.get(
  "/member/:memberId/movies",
  authenticateToken,
  authorize("View Subscriptions"),
  async (req, res) => {
    try {
      const result = await subscriptionRepo.getMoviesWatchedByMember(
        req.params.memberId
      );
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// ------------------------------------------------------
// POST create subscription
// ------------------------------------------------------
router.post(
  "/",
  authenticateToken,
  authorize("Create Subscriptions"),
  async (req, res) => {
    try {
      const newSubscription = await subscriptionRepo.createSubscription(
        req.body
      );
      res.json(newSubscription);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// ------------------------------------------------------
// PUT update subscription
// ------------------------------------------------------
router.put(
  "/:id",
  authenticateToken,
  authorize("Update Subscription"),
  async (req, res) => {
    try {
      const updatedSubscription = await subscriptionRepo.updateSubscription(
        req.params.id,
        req.body
      );
      res.json(updatedSubscription);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// ------------------------------------------------------
// DELETE subscription
// ------------------------------------------------------
router.delete(
  "/:id",
  authenticateToken,
  authorize("Delete Subscriptions"),
  async (req, res) => {
    try {
      await subscriptionRepo.deleteSubscription(req.params.id);
      res.json({ message: "Subscription deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// ------------------------------------------------------
// POST subscribe to a new movie
// ------------------------------------------------------
router.post(
  "/subscribe",
  authenticateToken,
  authorize("Create Subscriptions"),
  async (req, res) => {
    try {
      const { memberId, movieId, date } = req.body;

      if (!memberId || !movieId || !date) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const result = await subscriptionRepo.subscribeToMovie(
        memberId,
        movieId,
        date
      );

      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
