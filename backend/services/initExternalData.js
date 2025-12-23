const axios = require("axios");
const Member = require("../models/memberModel");
const Movie = require("../models/movieModel");

async function initExternalData() {
  const membersCount = await Member.countDocuments();
  const moviesCount = await Movie.countDocuments();

  if (membersCount === 0) {
    const membersRes = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const members = membersRes.data.map((m) => ({
      Name: m.name,
      Email: m.email,
      City: m.address.city,
    }));
    await Member.insertMany(members);
    console.log("Members imported from external API");
  }

  if (moviesCount === 0) {
    const moviesRes = await axios.get("https://api.tvmaze.com/shows");
    const movies = moviesRes.data.map((m) => ({
      Name: m.name,
      Genres: m.genres,
      Image: m.image?.medium || "",
      Premiered: m.premiered,
    }));
    await Movie.insertMany(movies);
    console.log("Movies imported from external API");
  }
}

module.exports = initExternalData;
