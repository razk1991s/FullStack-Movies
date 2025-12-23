const express = require('express');
const router = express.Router();
const subscriptionRepo = require('../repository/dbSubscriptionRepo');

// GET all subscriptions
router.get('/', async (req, res) => {
  const subscriptions = await subscriptionRepo.getAllSubscriptions();
  res.json(subscriptions);
});

// GET subscription by id
router.get('/:id', async (req, res) => {
  const subscription = await subscriptionRepo.getSubscriptionById(req.params.id);
  res.json(subscription);
});

// POST create subscription
router.post('/', async (req, res) => {
  const newSubscription = await subscriptionRepo.createSubscription(req.body);
  res.json(newSubscription);
});

// PUT update subscription
router.put('/:id', async (req, res) => {
  const updatedSubscription = await subscriptionRepo.updateSubscription(req.params.id, req.body);
  res.json(updatedSubscription);
});

// DELETE subscription
router.delete('/:id', async (req, res) => {
  await subscriptionRepo.deleteSubscription(req.params.id);
  res.json({ message: 'Subscription deleted' });
});

module.exports = router;
