import { useEffect, useState } from "react";

export default function ContinueWatching({ onSelect }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("continueWatching") || "{}");

    const list = Object.values(data)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 10);

    setItems(list);
  }, []);

  if (!items.length) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Continue Watching</h2>

      <div style={{ display: "flex", gap: "15px", overflowX: "auto" }}>
        {items.map((item, i) => {
          const percent = (item.progress / item.duration) * 100;

          return (
            <div
              key={i}
              onClick={() => onSelect(item)}
              style={{ width: "200px", cursor: "pointer" }}
            >
              <img
                src={item.backdrop}
                style={{ width: "100%", borderRadius: "10px" }}
              />

              <div
                style={{ height: "4px", background: "#333", marginTop: "5px" }}
              >
                <div
                  style={{
                    width: `${percent}%`,
                    height: "100%",
                    background: "red",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
