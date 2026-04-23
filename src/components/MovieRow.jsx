import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules"; 

export default function MovieRow({ title, movies }) {
  return (
    <div className="movie-row">
      <h2 style={{ margin: "10px 0", color: "white" }}>{title}</h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]} // pass the modules here
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                style={{ borderRadius: "6px", width: "100%" }}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
