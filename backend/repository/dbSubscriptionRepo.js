const Subscription = require('../models/subscriptionModel');

const getAllSubscriptions = () => Subscription.find();
const getSubscriptionById = (id) => Subscription.findById(id);
const createSubscription = (data) => Subscription.create(data);
const updateSubscription = (id, data) => Subscription.findByIdAndUpdate(id, data, { new: true });
const deleteSubscription = (id) => Subscription.findByIdAndDelete(id);

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription
};
