import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/api.js";
import MovieSection from "../components/MovieSection.jsx";

export default function Popular() {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true); //

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await getPopularMovies();
        setPopular(res.data);
      } catch (err) {
        console.error("Error fetching popular movies:", err);
      } finally {
        setLoading(false); //
      }
    };
    fetchPopular();
  }, []);

  return (
    <div className="trending-container">
      <MovieSection title="Popular" movies={popular} loading={loading} />
    </div>
  );
}
