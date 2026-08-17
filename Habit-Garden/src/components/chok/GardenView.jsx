import { useState } from "react";
import { PixelPlant } from "../lucky/Garden/Plants";
import "./GardenView.css";

function stageFromProgress(progress) {
  if (progress >= 80) return 5;
  if (progress >= 60) return 4;
  if (progress >= 40) return 3;
  if (progress >= 20) return 2;
  return 1;
}

const startingHabits = [
  {
    id: 1,
    title: "Morning run",
    category: "Fitness",
    species: "sunflower",
    streak: 5,
    progress: 80,
    completedToday: false,
  },
  {
    id: 2,
    title: "Reading",
    category: "Mind",
    species: "rose",
    streak: 4,
    progress: 60,
    completedToday: false,
  },
  {
    id: 3,
    title: "Meditation",
    category: "Wellness",
    species: "herb",
    streak: 2,
    progress: 40,
    completedToday: false,
  },
];

function GardenView({ user = { name: "Player", level: 1 } }) {
  const [habits, setHabits] = useState(startingHabits);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");

  const completedCount = habits.filter((habit) => habit.completedToday).length;

  const totalCount = habits.length;

  const bloomPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleWaterHabit = (habitId) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId && !habit.completedToday
          ? {
              ...habit,
              completedToday: true,
              streak: habit.streak + 1,
              progress: Math.min(habit.progress + 20, 100),
            }
          : habit,
      ),
    );
  };

  const handleConfirmPlant = () => {
    const title = newTitle.trim();

    if (!title) {
      setError("Enter a habit name first.");
      return;
    }

    const newHabit = {
      id: Date.now(),
      title: title,
      category: "New",
      species: "herb",
      streak: 0,
      progress: 0,
      completedToday: false,
    };

    setHabits((prev) => [...prev, newHabit]);

    setNewTitle("");
    setError("");
    setShowForm(false);
  };

  return (
    <div className="garden-page">
      {/* Header */}
      <div className="garden-header">
        <div>
          <h1>Welcome Avatar, {user.name}.</h1>
          <p>Your garden is looking healthy today.</p>
        </div>

        <div className="level-badge">
          <span>Level {user.level}</span>
        </div>
      </div>

      {/* Add new habit form */}
      {showForm && (
        <div className="plant-form">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleConfirmPlant();
              }
            }}
            placeholder="Name your new habit"
            autoFocus
          />

          <button onClick={handleConfirmPlant}>Add</button>
        </div>
      )}

      {error && <p className="plant-error">{error}</p>}

      {/* Button to open habit form */}
      <button
        className="plant-button"
        onClick={() => {
          setShowForm(true);
          setError("");
        }}
      >
        + Plant a new habit
      </button>

      {/* Today's progress */}
      <div className="bloom-card">
        <div className="bloom-info">
          <h2>Today's Bloom</h2>

          <p>
            You've nurtured {completedCount} out of {totalCount} habits today.
          </p>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${bloomPercentage}%` }}
            />
          </div>
        </div>

        <div className="bloom-icon">
          <PixelPlant
            stage={bloomPercentage >= 80 ? 5 : 3}
            species="sunflower"
            size={64}
          />
        </div>
      </div>

      {/* Garden plots */}
      <h2 className="plots-heading">Your Garden Plots</h2>

      <div className="plots-grid">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className={`plot-card ${habit.completedToday ? "plot-done" : ""}`}
          >
            <div className="plot-top">
              <span className="plot-category">{habit.category}</span>

              {habit.completedToday ? (
                <span className="plot-check">✓</span>
              ) : (
                <button
                  className="water-button"
                  onClick={() => handleWaterHabit(habit.id)}
                >
                  💧
                </button>
              )}
            </div>

            <div className="plot-plant">
              <PixelPlant
                stage={stageFromProgress(habit.progress)}
                species={habit.species}
                size={48}
              />
            </div>

            <h3 className="plot-title">{habit.title}</h3>

            <span className="plot-status">
              {habit.completedToday
                ? "Completed"
                : `${habit.streak} day streak`}
            </span>
          </div>
        ))}

        {/* Empty plot */}
        <div className="plot-card plot-empty" onClick={() => setShowForm(true)}>
          <span className="plot-empty-icon">+</span>

          <span>Empty Plot</span>

          <span className="plot-status">Plant new seed</span>
        </div>
      </div>
    </div>
  );
}

export default GardenView;
