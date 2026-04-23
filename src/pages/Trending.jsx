import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/api.js";
import MovieSection from "../components/MovieSection.jsx";

export default function Trending() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await getTrendingMovies();
        setTrending(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="trending-container">
      <MovieSection title="Trending" movies={trending} loading={loading} />
    </div>
  );
}
