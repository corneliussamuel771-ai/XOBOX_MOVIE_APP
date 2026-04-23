import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import BottomNav from "./components/BottomNav.jsx";

import Home from "./pages/Home.jsx";
import Trending from "./pages/Trending.jsx";
import Popular from "./pages/Popular.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Search from "./pages/Search.jsx";

export default function App() {
  return (
    <Router>
      <Navbar />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>

      <BottomNav />
    </Router>
  );
}
