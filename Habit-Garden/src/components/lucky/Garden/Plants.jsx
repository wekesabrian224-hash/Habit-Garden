function PixelPlant({ species, size }) {
  // These are the plants we can show
  const plants = {
    sunflower: "🌻",
    rose: "🌹",
    herb: "🌿",
    tulip: "🌷",
  };

  return <div style={{ fontSize: size }}>{plants[species] || "🌱"}</div>;
}

// Maps a habit category to a plant species
function speciesForCategory(category) {
  const categoryMap = {
    health: "sunflower",
    fitness: "sunflower",
    study: "herb",
    learning: "herb",
    mindfulness: "rose",
    selfcare: "rose",
    creativity: "tulip",
  };

  return categoryMap[category?.toLowerCase()] || "herb";
}

// Converts a progress percentage (0-100) into a growth stage (1-5)
function stageFromProgress(progress) {
  if (progress >= 80) return 5;
  if (progress >= 60) return 4;
  if (progress >= 40) return 3;
  if (progress >= 20) return 2;
  return 1;
}

export { PixelPlant, speciesForCategory, stageFromProgress };