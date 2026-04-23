export default function TrailerPlayer({ videoKey }) {
  if (!videoKey) return <p>No trailer available</p>;
  return (
    <div className="trailer-player">
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
        title="Trailer"
        allowFullScreen
      />
    </div>
  );
}
