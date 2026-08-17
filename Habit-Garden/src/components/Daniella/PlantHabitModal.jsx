import { useState } from "react";
import { PixelPlant, speciesForCategory } from "../lucky/Garden/Plants";


const seedOptions = [
  { icon: "water_drop", name: "Water", category: "Health" },
  { icon: "self_improvement", name: "Meditation", category: "Mindfulness" },
  { icon: "menu_book", name: "Reading", category: "Reading" },
  { icon: "fitness_center", name: "Exercise", category: "Exercise" },
  { icon: "bedtime", name: "Sleep", category: "Sleep" },
  { icon: "edit_note", name: "Journal", category: "Journal" },
];

// One seed choice in the horizontal picker.
// Pulled out on its own so the form doesn't get buried under styling,
// and each button just says whether it's the selected one.
function SeedButton({ seed, isSelected, onSelect }) {
  const buttonStyle = isSelected
    ? "border-[#4a6549] bg-[#8ba888] text-[#243d24] scale-105 font-bold"
    : "border-transparent bg-[#ece8df] dark:bg-[#243d24] text-[#434841] dark:text-[#c3c8bf] hover:border-[#ccebc7]";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex-shrink-0 w-16 h-16 rounded-2xl border-2 transition-all flex flex-col items-center justify-center shadow-sm ${buttonStyle}`}
    >
      <span className={`material-symbols-outlined text-2xl ${isSelected ? "filled" : ""}`}>{seed.icon}</span>
    </button>
  );
}

export const PlantHabitModal = ({ isOpen, onClose, onAddHabit }) => {
  const [title, setTitle] = useState("");
  const [selectedSeed, setSelectedSeed] = useState({ icon: "water_drop", category: "Health" });
  const [schedule, setSchedule] = useState("Daily");

  if (!isOpen) return null;

  const previewSpecies = speciesForCategory(selectedSeed.category);

  // A title with only spaces shouldn't count, so I trim before checking.
  // Naming it once keeps the button's disabled check and the submit guard in sync.
  const hasTitle = title.trim().length > 0;

  // Controlled form, so preventDefault() stops the page from reloading.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasTitle) return;

    const cleanTitle = title.trim();
    const now = Date.now();

    const newHabit = {
      id: `habit-${now}`,
      title: cleanTitle,
      category: selectedSeed.category,
      icon: selectedSeed.icon,
      species: speciesForCategory(selectedSeed.category),
      stage: "Seedling",
      streak: 1,
      progress: 15,
      schedule,
      completedToday: false,
      tasks: [{ id: `t-${now}-1`, label: `Complete ${cleanTitle}`, completed: false }],
    };

    onAddHabit(newHabit);
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Dark background. Clicking it closes the modal. */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#fdf9f0]/60 dark:bg-black/60 backdrop-blur-md"
      />

      {/* The bottom sheet */}
      <div className="bg-[#fdf9f0] dark:bg-[#1e331e] rounded-t-[2.5rem] w-full max-w-[600px] mx-auto shadow-2xl z-50 p-6 pb-10 border-t border-[#ccebc7]/50 max-h-[90vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-[#c3c8bf] dark:bg-[#737970] rounded-full mx-auto mb-6" />
        <h2 className="font-bold text-2xl sm:text-3xl text-[#1c1c17] dark:text-[#fdf9f0] text-center mb-6">Plant a new habit</h2>

        {/* Live preview of the plant you're about to grow */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-[#eafbe4] dark:bg-[#243d24] flex items-end justify-center shadow-md border-2 border-[#ccebc7] overflow-hidden">
            <PixelPlant stage={1} species={previewSpecies} size={80} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Controlled text input: value comes from state, onChange updates state. */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#737970] text-xl">psychiatry</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What are we growing?"
              className="w-full bg-[#f7f3ea] dark:bg-[#243d24] border-2 border-[#c3c8bf]/50 focus:border-[#4a6549] dark:focus:border-[#ccebc7] rounded-2xl py-3.5 pl-12 pr-4 text-lg font-semibold text-[#1c1c17] dark:text-[#fdf9f0] outline-none transition-colors placeholder-[#737970]"
            />
          </div>

          {/* Seed picker */}
          <div>
            <label className="text-xs font-bold text-[#434841] dark:text-[#c3c8bf] mb-3 block">Choose a seed</label>
            <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2 pt-1 px-1">
              {seedOptions.map((seed) => (
                <SeedButton
                  key={seed.icon}
                  seed={seed}
                  isSelected={selectedSeed.icon === seed.icon}
                  onSelect={() => setSelectedSeed({ icon: seed.icon, category: seed.category })}
                />
              ))}
            </div>
          </div>

          {/* Watering schedule */}
          <div>
            <label className="text-xs font-bold text-[#434841] dark:text-[#c3c8bf] mb-3 block">Watering Schedule</label>
            <div className="grid grid-cols-2 gap-3">
              {["Daily", "Weekdays"].map((option) => {
                const isSelected = schedule === option;
                const optionStyle = isSelected
                  ? "border-[#4a6549] bg-[#8ba888] text-[#243d24]"
                  : "border-[#c3c8bf]/50 bg-[#f7f3ea] dark:bg-[#243d24] text-[#434841] dark:text-[#c3c8bf]";

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSchedule(option)}
                    className={`py-3.5 px-4 rounded-2xl border-2 font-bold text-base transition-colors text-center ${optionStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Disabled until there's a real title, matching the submit guard above. */}
          <button
            type="submit"
            disabled={!hasTitle}
            className="w-full bg-[#4a6549] text-white font-bold text-lg py-4 rounded-full shadow-[0_4px_16px_rgba(74,101,73,0.25)] hover:bg-[#243d24] active:scale-98 transition-all duration-200 mt-4 disabled:opacity-50"
          >
            Plant it!
          </button>
        </form>
      </div>
    </div>
  );
};