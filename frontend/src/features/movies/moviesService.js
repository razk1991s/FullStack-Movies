import api from "../../services/api";

export const getMovies = () => api.get("/api/movies");
export const addMovie = (movie) => api.post("/api/movies", movie);
