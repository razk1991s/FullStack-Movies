const Movie = require('../models/movieModel');

const getAllMovies = () => Movie.find();
const getMovieById = (id) => Movie.findById(id);
const createMovie = (data) => Movie.create(data);
const updateMovie = (id, data) => Movie.findByIdAndUpdate(id, data, { new: true });
const deleteMovie = (id) => Movie.findByIdAndDelete(id);

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
