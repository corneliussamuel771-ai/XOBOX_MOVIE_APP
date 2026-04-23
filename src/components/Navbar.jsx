import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Search, Bell } from "lucide-react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/search");
  };

  // scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* LEFT */}
      <div className="nav-left">
        <h2 onClick={() => navigate("/")}>XOBOX</h2>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>

          <NavLink
            to="/trending"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Trending
          </NavLink>

          <NavLink
            to="/popular"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Popular
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Movies
          </NavLink>
        </div>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <Search className="icons" onClick={handleSearch} />
        <Bell className="icon bell-icon" />
      </div>
    </nav>
  );
}
