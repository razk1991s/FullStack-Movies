const movieRepo = require('../repository/dbMovieRepo');

const getAllMovies = async () => movieRepo.getAllMovies();
const getMovieById = async (id) => movieRepo.getMovieById(id);
const createMovie = async (data) => movieRepo.createMovie(data);
const updateMovie = async (id, data) => movieRepo.updateMovie(id, data);
const deleteMovie = async (id) => movieRepo.deleteMovie(id);

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
