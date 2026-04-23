import { useEffect, useState } from "react";
import { getFavorites } from "../services/api";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await getFavorites();
      setFavorites(res.data);
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>⭐ Favorite Movies</h1>

      {favorites.map((movie) => (
        <p key={movie._id}>{movie.title}</p>
      ))}
    </div>
  );
};

export default Favorites;
