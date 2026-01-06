const Subscription = require("../models/subscriptionModel");
const Movie = require("../models/movieModel");

const getAllSubscriptions = () => Subscription.find();

const getSubscriptionById = (id) => Subscription.findById(id);

const createSubscription = (data) => Subscription.create(data);

const updateSubscription = (id, data) =>
  Subscription.findByIdAndUpdate(id, data, { new: true });

const deleteSubscription = (id) => Subscription.findByIdAndDelete(id);

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
