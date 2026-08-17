function PixelPlant({ species, size }) {
  // These are the plants we can show
  const plants = {
    sunflower: "🌻",
    rose: "🌹",
    herb: "🌿",
  };

  return <div style={{ fontSize: size }}>{plants[species] || "🌱"}</div>;
}

export { PixelPlant };
