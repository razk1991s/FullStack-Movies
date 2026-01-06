const Movie = require("../models/movieModel");
const Subscription = require("../models/subscriptionModel");

const getAllMovies = () => Movie.find();

const getMovieById = (id) => Movie.findById(id);

const createMovie = (data) => Movie.create(data);

const updateMovie = (id, data) =>
  Movie.findByIdAndUpdate(id, data, { new: true });

// delete a movie and remove it from all subscriptions
const deleteMovie = async (id) => {
  await Movie.findByIdAndDelete(id);

  await Subscription.updateMany({}, { $pull: { Movies: { movieId: id } } });

  return { message: "Movie and related subscriptions removed" };
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
