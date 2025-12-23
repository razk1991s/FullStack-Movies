const express = require("express");
const router = express.Router();
const movieRepo = require("../repository/dbMovieRepo");
const {
  authenticateToken,
  authorize,
} = require("../middleware/authMiddleware");

// GET all movies
router.get(
  "/",
  authenticateToken,
  authorize("View Movies"),
  async (req, res) => {
    const movies = await movieRepo.getAllMovies();
    res.json(movies);
  }
);

// GET movie by id
router.get(
  "/:id",
  authenticateToken,
  authorize("View Movies"),
  async (req, res) => {
    const movie = await movieRepo.getMovieById(req.params.id);
    res.json(movie);
  }
);

// POST create movie
router.post(
  "/",
  authenticateToken,
  authorize("Create Movies"),
  async (req, res) => {
    const newMovie = await movieRepo.createMovie(req.body);
    res.json(newMovie);
  }
);

// PUT update movie
router.put(
  "/:id",
  authenticateToken,
  authorize("Update Movie"),
  async (req, res) => {
    const updatedMovie = await movieRepo.updateMovie(req.params.id, req.body);
    res.json(updatedMovie);
  }
);

// DELETE movie
router.delete(
  "/:id",
  authenticateToken,
  authorize("Delete Movies"),
  async (req, res) => {
    await movieRepo.deleteMovie(req.params.id);
    res.json({ message: "Movie deleted" });
  }
);

module.exports = router;
