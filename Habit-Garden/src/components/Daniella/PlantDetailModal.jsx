import { useState } from "react";
import { PixelPlant, speciesForCategory, stageFromProgress } from "../garden/plants.jsx";

// A single row in the "Today's Care" list.
// I pulled this into its own small component so the main modal stays
// readable and each task takes care of its own styling.
function CareTask({ task, onToggle }) {
  const rowStyle = task.completed
    ? "bg-[#f7f3ea] dark:bg-[#243d24]/60 border-[#c3c8bf]/30 opacity-85"
    : "bg-white dark:bg-[#243d24] border-[#4a6549]/30 shadow-sm hover:border-[#4a6549]";

  const labelStyle = task.completed
    ? "line-through text-[#737970] dark:text-[#c3c8bf]"
    : "text-[#1c1c17] dark:text-[#fdf9f0]";

  return (
    <label className={`flex items-center gap-3.5 p-4 rounded-2xl cursor-pointer transition-all border ${rowStyle}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        className="w-5 h-5 rounded-md text-[#4a6549] bg-white border-[#c3c8bf] focus:ring-[#4a6549]"
      />
      <span className={`flex-1 text-base font-semibold ${labelStyle}`}>
        {task.label}
      </span>
    </label>
  );
}

export const PlantDetailModal = ({ habit, onClose, onWaterHabit, onToggleTask }) => {
  const [showWaterEffect, setShowWaterEffect] = useState(false);

  // If no habit is selected, there's nothing to show.
  if (!habit) return null;

  // Figure out the plant's look once, up top, so the JSX below stays clean.
  const species = habit.species || speciesForCategory(habit.category);
  const stage = stageFromProgress(habit.progress);

  // Naming these makes the JSX read like plain English instead of raw checks.
  const isFullyGrown = habit.progress >= 100;
  const isWateredToday = habit.completedToday;

  const handleWaterClick = () => {
    setShowWaterEffect(true);
    onWaterHabit(habit.id);
    // Hide the little "Watered!" pop-up after a moment.
    setTimeout(() => setShowWaterEffect(false), 1500);
  };

  // The water button swaps colour and text depending on whether we've
  // already checked in today, so I build its style here instead of inline.
  const waterButtonStyle = isWateredToday
    ? "bg-[#8ba888]/50 text-[#243d24] cursor-default"
    : "bg-[#4a6549] text-white hover:bg-[#243d24] active:scale-98";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark background. Clicking it closes the modal. */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-md"
      />

      {/* The modal card itself */}
      <div className="relative z-50 bg-[#ffffff] dark:bg-[#1e331e] w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[#ccebc7]/40">
        {/* --- Header: the plant and the close button --- */}
        <div className="relative h-64 bg-[#ccebc7] dark:bg-[#243d24] flex items-end justify-center shrink-0 overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/70 dark:bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-[#1c1c17] dark:text-white hover:bg-white transition-colors shadow-sm z-20"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="pb-4">
            <PixelPlant stage={stage} species={species} size={150} />
          </div>

          {/* Watering pop-up. Only shows while showWaterEffect is true. */}
          {showWaterEffect && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-[#8ba888]/30 backdrop-blur-[2px] z-10">
              <div className="flex flex-col items-center gap-2 text-white font-bold bg-[#4a6549] px-6 py-3 rounded-full shadow-lg">
                <span className="material-symbols-outlined text-3xl animate-bounce">water_drop</span>
                <span>Watered &amp; Nourished! 🌿</span>
              </div>
            </div>
          )}
        </div>

        {/* --- Body: details, progress, and today's tasks --- */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-[#d6e7d1] dark:bg-[#3b4b3a] text-[#111f11] dark:text-[#ccebc7] rounded-full font-semibold text-xs shadow-sm">
              <span className="material-symbols-outlined text-[16px] mr-1.5 text-[#4a6549] dark:text-[#ccebc7]">auto_awesome</span>
              <span>{habit.stage}</span>
            </div>
            <h2 className="font-bold text-3xl text-[#1c1c17] dark:text-[#fdf9f0]">{habit.title}</h2>
            <p className="text-[#885031] dark:text-[#ffb690] font-semibold text-base flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined filled text-xl">local_fire_department</span>
              <span>{habit.streak} Day Streak</span>
            </p>
          </div>

          {/* Progress card */}
          <div className="bg-[#f1eee5] dark:bg-[#243d24] p-5 rounded-3xl space-y-3 border border-[#c3c8bf]/30">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-[#1c1c17] dark:text-[#fdf9f0]">Growth to Next Stage</span>
              <span className="text-[#4a6549] dark:text-[#ccebc7]">{habit.progress}%</span>
            </div>
            <div className="h-3.5 bg-[#e6e2d9] dark:bg-[#1e331e] rounded-full overflow-hidden p-0.5">
              {/* Width comes from the habit's progress; the transition makes it slide. */}
              <div
                style={{ width: `${habit.progress}%` }}
                className="h-full bg-[#4a6549] dark:bg-[#ccebc7] rounded-full transition-all duration-700 ease-out"
              />
            </div>
            <p className="text-xs text-[#434841] dark:text-[#c3c8bf] text-center font-medium">
              {isFullyGrown
                ? "Your plant is fully bloomed and thriving!"
                : "Just a few more check-ins until your plant matures!"}
            </p>
          </div>

          {/* Today's care tasks */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-[#1c1c17] dark:text-[#fdf9f0] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4a6549] dark:text-[#ccebc7]">task_alt</span>
              <span>Today's Care</span>
            </h3>
            <div className="space-y-2.5">
              {habit.tasks.map((task) => (
                <CareTask
                  key={task.id}
                  task={task}
                  onToggle={() => onToggleTask(habit.id, task.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- Footer: the water / check-in button --- */}
        <div className="p-5 bg-white dark:bg-[#1e331e] border-t border-[#e6e2d9] dark:border-[#2c3b2b] shrink-0">
          <button
            onClick={handleWaterClick}
            disabled={isWateredToday}
            className={`w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-[0_4px_16px_rgba(74,101,73,0.2)] ${waterButtonStyle}`}
          >
            <span className="material-symbols-outlined filled text-xl">water_drop</span>
            <span>{isWateredToday ? "Watered Today ✨" : "Water Plant (Check In)"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};