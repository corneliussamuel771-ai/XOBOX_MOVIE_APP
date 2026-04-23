import { useEffect, useState } from "react";

const HeroBanner = ({ movies }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movies.length) return;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    setMovie(randomMovie);
  }, [movies]);

  if (!movie) return null;

  const background = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="hero-content">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default HeroBanner;
