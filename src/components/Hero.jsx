import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./hero.module.css";

export default function Hero({ movie, loading }) {
  const [iframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    setIframeReady(false);
  }, [movie?.trailerKey]);

  if (loading) {
    return (
      <div style={{ padding: "0 20px" }}>
        <Skeleton height={500} borderRadius={12} />
      </div>
    );
  }

  if (!movie?.trailerKey) return null;

  const url = `https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${movie.trailerKey}&modestbranding=1&iv_load_policy=3`;

  return (
    <div style={{ padding: "0 20px" }}>
      <div className="hero-container-pro">
        {/* blurred cinematic background */}
        <img
          src={movie.backdrop || movie.image}
          alt={movie.title}
          className="hero-bg"
        />

        {/* video */}
        <div className={styles["iframe-cover-container"]}>
          <iframe
            src={url}
            title={movie.title}
            className={`${styles.heroVideo} ${iframeReady ? "show" : ""}`}
            onLoad={() => setIframeReady(true)}
            allow="autoplay; fullscreen"
          />
        </div>

        {/* cinematic overlay */}
        <div className="hero-content">
          <h1>{movie.title}</h1>
          <p>{movie.overview?.slice(0, 120)}</p>

          <button className="cta">Watch Trailer</button>
        </div>
      </div>
    </div>
  );
}
