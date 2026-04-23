import { useEffect, useState, useMemo } from "react";
import { getTrendingMovies, getPopularMovies } from "../services/api.js";
import MovieSlider from "../components/MovieSlider.jsx";
import Hero from "../components/Hero.jsx";
import ContinueWatching from "../components/ContinueWatching";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonHero = () => (
  <div style={{ width: "100%", padding: "0 20px", boxSizing: "border-box" }}>
    <div style={{ height: "500px", borderRadius: "12px", overflow: "hidden" }}>
      <Skeleton height="100%" />
    </div>
  </div>
);

function TrailerModal({ movie, onClose }) {
  if (!movie?.trailerKey) return null;

  const url = `https://www.youtube.com/embed/${movie.trailerKey}?enablejsapi=1&autoplay=1&controls=1`;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    let player;
    let interval;

    function initPlayer() {
      player = new window.YT.Player("yt-player", {
        events: {
          onReady: () => {
            const saved = JSON.parse(
              localStorage.getItem("continueWatching") || "{}",
            )[movie.id];

            if (saved?.progress) {
              player.seekTo(saved.progress, true);
            }

            interval = setInterval(() => {
              if (!player) return;

              const current = player.getCurrentTime();
              const duration = player.getDuration();

              const data = JSON.parse(
                localStorage.getItem("continueWatching") || "{}",
              );

              data[movie.id] = {
                title: movie.title,
                backdrop: movie.backdrop || movie.image,
                trailerKey: movie.trailerKey,
                progress: current,
                duration,
                updatedAt: Date.now(),
              };

              localStorage.setItem("continueWatching", JSON.stringify(data));
            }, 2000);
          },
        },
      });
    }

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [movie]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.95)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "80%",
          maxWidth: "1000px",
          aspectRatio: "16 / 9",
          background: "#000",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 25px 80px rgba(0,0,0,0.8)",
        }}
      >
        <iframe
          id="yt-player"
          src={url}
          title={movie.title}
          width="100%"
          height="100%"
          style={{
            border: "none",
            display: "block",
          }}
          allow="autoplay; fullscreen"
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [fade, setFade] = useState(true);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingRes = await getTrendingMovies();
        const popularRes = await getPopularMovies();

        setTrending(trendingRes.data);
        setPopular(popularRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // HERO ROTATION
  useEffect(() => {
    if (!trending.length || paused) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setHeroIndex((prev) =>
          trending.length ? (prev + 1) % trending.length : 0,
        );
        setProgress(0);
        setFade(true);
      }, 250);
    }, 6000);

    return () => clearInterval(interval);
  }, [trending, paused]);

  // PROGRESS BAR
  useEffect(() => {
    if (!trending.length || paused) return;

    const step = 100 / 600;

    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + step));
    }, 60);

    return () => clearInterval(interval);
  }, [heroIndex, paused, trending]);

  // KEYBOARD CONTROL
  useEffect(() => {
    const handleKey = (e) => {
      if (!trending.length) return;

      if (e.key === "ArrowRight") {
        setHeroIndex((p) => (p + 1) % trending.length);
      }

      if (e.key === "ArrowLeft") {
        setHeroIndex((p) => (p === 0 ? trending.length - 1 : p - 1));
      }

      if (e.key === "Enter") setModalOpen(true);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [trending]);

  const heroMovie = useMemo(() => {
    return trending[heroIndex];
  }, [trending, heroIndex]);

  return (
    <div>
      {/* HERO */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onClick={() => {
          setSelectedMovie(heroMovie);
          setModalOpen(true);
        }}
        style={{ cursor: "pointer" }}
      >
        {loading ? (
          <SkeletonHero />
        ) : (
          <div
            style={{
              opacity: fade ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <Hero movie={heroMovie} loading={loading} />
          </div>
        )}

        {!loading && (
          <div
            style={{
              width: "calc(100% - 40px)",
              height: "3px",
              margin: "0 20px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "white",
              }}
            />
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <TrailerModal
          movie={selectedMovie || heroMovie}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* CONTENT */}
      <div className="notif">
        <ContinueWatching
          onSelect={(movie) => {
            setSelectedMovie(movie);
            setModalOpen(true);
          }}
        />

        <MovieSlider title="Trending" movies={trending} loading={loading} />
        <MovieSlider title="Popular" movies={popular} loading={loading} />
      </div>
    </div>
  );
}
