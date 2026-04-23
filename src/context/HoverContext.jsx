import { createContext, useState } from "react";

export const HoverContext = createContext();

export function HoverProvider({ children }) {
  const [activeMovieId, setActiveMovieId] = useState(null);

  return (
    <HoverContext.Provider value={{ activeMovieId, setActiveMovieId }}>
      {children}
    </HoverContext.Provider>
  );
}
