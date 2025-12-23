const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Genres: [{ type: String }],
  Image: { type: String },
  Premiered: { type: Date }
});

module.exports = mongoose.model('Movie', movieSchema);