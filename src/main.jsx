import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HoverProvider } from "./context/HoverContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HoverProvider>
      <SkeletonTheme baseColor="#141414" highlightColor="#2a2a2a">
        <App />
      </SkeletonTheme>
    </HoverProvider>
  </React.StrictMode>,
);
