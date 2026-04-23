import { NavLink } from "react-router-dom";
import { FaHome, FaFire, FaStar, FaSearch } from "react-icons/fa";

export default function BottomNav() {
  return (
    <div className="bottom-nav">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <FaHome />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/trending"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <FaFire />
        <span>Trending</span>
      </NavLink>

      {/* Center Action Button */}
      <NavLink
        to="/search"
        className={({ isActive }) =>
          isActive ? "nav-center active" : "nav-center"
        }
      >
        <FaSearch />
      </NavLink>

      <NavLink
        to="/popular"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <FaStar />
        <span>Popular</span>
      </NavLink>
    </div>
  );
}
