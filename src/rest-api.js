import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODg5NjNkOWVmNjY2Y2U1NzUyZGQ0YjFmMWYyOWM0MSIsInN1YiI6IjY1ZTgzNjI1OTYzODY0MDE2MWM4YjdkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TcWY-9VW7rWbzwtFfxE2esAqjlUQYEVyJY43nuQdgMU";

export const trendingMovie = async () => {
  const response = await axios.get("/trending/movie/day");
  return response.data.results;
};

export const searchMovie = async (query, page) => {
  const response = await axios.get(`/search/movie?query=${query}&page=${page}`);
  return response.data;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
};

export const getImagePath = async () => {
  const response = await axios.get("/configuration");
  return response.data.images;
};

export const getCredits = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`);

  return response.data.cast;
};

export const getReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
