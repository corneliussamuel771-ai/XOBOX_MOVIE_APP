import { useRef, useEffect } from "react";

export default function VideoPlayer({ src, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <video
        ref={videoRef}
        controls
        autoPlay
        style={{ width: "90%", maxHeight: "90%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
