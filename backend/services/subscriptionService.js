const subscriptionRepo = require('../repository/dbSubscriptionRepo');

const getAllSubscriptions = async () => subscriptionRepo.getAllSubscriptions();
const getSubscriptionById = async (id) => subscriptionRepo.getSubscriptionById(id);
const createSubscription = async (data) => subscriptionRepo.createSubscription(data);
const updateSubscription = async (id, data) => subscriptionRepo.updateSubscription(id, data);
const deleteSubscription = async (id) => subscriptionRepo.deleteSubscription(id);

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription
};
