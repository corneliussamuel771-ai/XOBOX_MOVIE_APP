import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MovieCard from "./MovieCard";
import { FreeMode } from "swiper/modules";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MovieSlider({ title, movies = [], loading }) {
  const slidesCount = 6;

  const renderSkeletonSlides = () =>
    Array(slidesCount)
      .fill(0)
      .map((_, i) => (
        <SwiperSlide key={i}>
          <div className="skeleton-card">
            <Skeleton height={220} borderRadius={8} />
            <Skeleton height={14} width="90%" style={{ marginTop: 10 }} />
            <Skeleton height={12} width="60%" />
          </div>
        </SwiperSlide>
      ));

  return (
    <div className="slider-section">
      <h2>{title}</h2>

      <Swiper
        modules={[FreeMode]}
        spaceBetween={12}
        freeMode={true}
        grabCursor={true}
        watchSlidesProgress={true}
        breakpoints={{
          0: { slidesPerView: 1.1, spaceBetween: 10 },
          480: { slidesPerView: 1.3, spaceBetween: 12 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
      >
        {loading || movies.length === 0
          ? renderSkeletonSlides()
          : movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}
