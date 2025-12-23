const Movie = require("../models/movieModel");
const Subscription = require("../models/subscriptionModel");

// שליפת כל הסרטים
const getAllMovies = () => Movie.find();

// שליפת סרט לפי ID
const getMovieById = (id) => Movie.findById(id);

// יצירת סרט חדש
const createMovie = (data) => Movie.create(data);

// עדכון סרט
const updateMovie = (id, data) =>
  Movie.findByIdAndUpdate(id, data, { new: true });

// מחיקת סרט + מחיקת הופעות שלו ב-Subscriptions
const deleteMovie = async (id) => {
  // מחיקת הסרט עצמו
  await Movie.findByIdAndDelete(id);

  // מחיקת הסרט מכל המנויים
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
