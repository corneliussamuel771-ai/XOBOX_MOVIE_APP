import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";

export default function SearchBar({ setMovies }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;

      try {
        const res = await searchMovies(query);
        setMovies(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const delay = setTimeout(fetchMovies, 500); // debounce

    return () => clearTimeout(delay);
  }, [query, setMovies]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
