const Subscription = require("../models/subscriptionModel");
const Movie = require("../models/movieModel");

// GET all subscriptions
const getAllSubscriptions = () => Subscription.find();

// GET subscription by ID
const getSubscriptionById = (id) => Subscription.findById(id);

// CREATE subscription
const createSubscription = (data) => Subscription.create(data);

// UPDATE subscription
const updateSubscription = (id, data) =>
  Subscription.findByIdAndUpdate(id, data, { new: true });

// DELETE subscription
const deleteSubscription = (id) => Subscription.findByIdAndDelete(id);

// SUBSCRIBE to movie
async function subscribeToMovie(memberId, movieId, date) {
  let subscription = await Subscription.findOne({ MemberId: memberId });

  if (!subscription) {
    subscription = await Subscription.create({
      MemberId: memberId,
      Movies: [{ movieId, date }],
    });
    return subscription;
  }

  const exists = subscription.Movies.some(
    (m) => m.movieId.toString() === movieId
  );

  if (exists) {
    throw new Error("Movie already exists in subscription");
  }

  subscription.Movies.push({ movieId, date });
  await subscription.save();

  return subscription;
}

// MOVIES WATCHED
async function getMoviesWatchedByMember(memberId) {
  const subscription = await Subscription.findOne({ MemberId: memberId });
  if (!subscription) return [];

  const movieIds = subscription.Movies.map((m) => m.movieId);
  const movies = await Movie.find({ _id: { $in: movieIds } });

  return subscription.Movies.map((entry) => {
    const movie = movies.find((m) => m._id.toString() === entry.movieId);
    return {
      movieId: entry.movieId,
      movieName: movie?.Name || "Unknown",
      date: entry.date,
    };
  });
}

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  subscribeToMovie,
  getMoviesWatchedByMember,
};
