import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./MovieCard.css";
import { HoverContext } from "../context/HoverContext";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const { activeMovieId, setActiveMovieId } = useContext(HoverContext);

  const [imgLoaded, setImgLoaded] = useState(false);
  const hoverTimer = useRef(null);

  const isActive = activeMovieId === movie.id;

  const addToFavorites = (movie, e) => {
    e.stopPropagation();

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.find((fav) => fav.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  // hover enter (delayed activation)
  const handleEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setActiveMovieId(movie.id);
    }, 300);
  };

  // hover leave (global reset)
  const handleLeave = () => {
    clearTimeout(hoverTimer.current);
    setActiveMovieId(null);
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {/* ⭐ Favorite */}
      <button
        className="favorite-btn"
        onClick={(e) => addToFavorites(movie, e)}
      >
        ⭐
      </button>

      {/* Skeleton */}
      {!imgLoaded && (
        <div className="poster-wrapper">
          <Skeleton height="100%" borderRadius={12} />
        </div>
      )}

      {/*  Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onLoad={() => setImgLoaded(true)}
        className={`poster ${imgLoaded ? "show" : "hide"}`}
      />

      {/* Netflix-style single active trailer */}
      {isActive && movie.trailerKey && (
        <iframe
          className="trailer"
          src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movie.trailerKey}`}
          title={movie.title}
        />
      )}

      {/* Overlay */}
      <div className="overlay">
        <h3>{movie.title}</h3>
      </div>
    </div>
  );
}
