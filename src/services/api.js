// src/services/api.js
import axios from "axios";
import { BASE_URL } from "../constants";

const API = axios.create({
  baseURL: `${BASE_URL}/api`, // your backend server
});

// Movies
export const getTrendingMovies = () => API.get("/movies/trending");
export const getPopularMovies = () => API.get("/movies/popular");
export const getTopRatedMovies = () => API.get("/movies/top-rated");
export const searchMovies = (query) => API.get(`/movies/search?query=${query}`);
export const getMovieDetails = (id) => API.get(`/movies/details/${id}`);
export const getMovieTrailer = (id) => API.get(`/movies/trailer/${id}`);

// Favorites
export const getFavorites = () => API.get("/favorites");
export const addFavorite = (movie) => API.post("/favorites", movie);
