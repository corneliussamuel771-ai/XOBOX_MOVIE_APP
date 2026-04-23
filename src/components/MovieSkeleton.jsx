import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MovieSkeleton() {
  return (
    <div className="movie-card-skeleton">
      {/* Poster (this matches most MovieCard layouts) */}
      <div className="poster-skeleton">
        <Skeleton height="100%" width="100%" borderRadius={12} />
      </div>

      {/* Title */}
      <div style={{ marginTop: 10 }}>
        <Skeleton height={16} width="85%" />
      </div>

      {/* Meta info (rating/year/etc.) */}
      <div style={{ marginTop: 6 }}>
        <Skeleton height={12} width="60%" />
      </div>
    </div>
  );
}
