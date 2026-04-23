import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TrailerPlayer from "../components/TrailerPlayer.jsx";
import "../MovieDetails.css";
import { BASE_URL } from "../constants.js";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieRes = await axios.get(
          `${BASE_URL}/api/movies/details/${id}`,
        );

        const trailerRes = await axios.get(
          `${BASE_URL}/api/movies/trailer/${id}`,
        );

        setMovie(movieRes.data);
        setTrailerKey(trailerRes.data.key);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-page">
        <div className="container">
          <p className="loading">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-page">
        <div className="container">
          <p className="loading">Movie not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-page">
      <div className="container">
        {/* Movie Header */}
        <div className="movie-header">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="movie-info">
            <h1>{movie.title}</h1>

            <p className="overview">{movie.overview}</p>

            <div className="meta">
              <span>⭐ {movie.vote_average}</span>
              <span>Release: {movie.release_date}</span>
              <span>Runtime: {movie.runtime} mins</span>
            </div>
          </div>
        </div>

        {/* Trailer Section */}
        <div className="trailer-section">
          <h2>Official Trailer</h2>

          <div className="trailer-box">
            <TrailerPlayer videoKey={trailerKey} />
          </div>
        </div>
      </div>
    </div>
  );
}
