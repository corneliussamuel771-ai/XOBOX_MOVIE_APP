import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "../search.css";

const Search = () => {
  const [movies, setMovies] = useState([]);

  return (
    <div className="search-page">
      <SearchBar setMovies={setMovies} />

      <div className="movies-grid">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>⭐ {movie.vote_average}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
