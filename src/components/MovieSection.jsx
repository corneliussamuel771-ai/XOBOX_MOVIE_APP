import MovieCard from "./MovieCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MovieSection({ title, movies, loading }) {
  return (
    <div className="movie-section">
      <h2>{title}</h2>

      <div className="movies-grid">
        {loading
          ? Array(20)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="movie-card">
                  <Skeleton
                    height={270}
                    borderRadius={10}
                    baseColor="#1a1a1a"
                    highlightColor="#2a2a2a"
                  />
                  <div style={{ marginTop: "10px" }}>
                    <Skeleton
                      height={18}
                      width="80%"
                      baseColor="#1a1a1a"
                      highlightColor="#2a2a2a"
                    />
                    <Skeleton
                      height={14}
                      width="60%"
                      baseColor="#1a1a1a"
                      highlightColor="#2a2a2a"
                    />
                  </div>
                </div>
              ))
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}
