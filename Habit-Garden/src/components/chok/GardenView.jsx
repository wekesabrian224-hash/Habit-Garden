import { motion } from "motion/react";
import { PixelPlant, speciesForCategory, stageFromProgress } from "../garden/plants.jsx";
import { GardenScene, useDayPhase } from "../garden/residents.jsx";

const GREETING = {
    dawn: "Good morning",
    day: "Good afternoon",
    dusk: "Good evening",
    night: "Winding down",
};

export const GardenView = ({
    habits,
    user,
    celebrateKey,
    onOpenPlantModal,
    onSelectHabit,
    onWaterHabit,
    onOpenCoach,
}) => {
    const { phase } = useDayPhase();
    const completedCount = habits.filter((h) => h.completedToday).length;
    const totalCount = habits.length;
    const bloomPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const plantOf = (h) => ({
        species: h.species || speciesForCategory(h.category),
        stage: stageFromProgress(h.progress),
    });

    return (
        <div className="pt-20 pb-32 px-4 sm:px-6 max-w-[1100px] mx-auto min-h-screen">
            {/* Greeting */}
            <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="font-bold text-3xl sm:text-4xl text-[#1c1c17] dark:text-[#ccebc7] mb-1">
                        {GREETING[phase]}, {user.name}.
                    </h1>
                    <p className="text-base sm:text-lg text-[#434841] dark:text-[#c3c8bf]">
                        {phase === "night"
                            ? "Your garden is resting. Tend a few things before bed."
                            : "Your garden is looking healthy today."}
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-[#f1eee5] dark:bg-[#243d24] px-4 py-2 rounded-2xl border border-[#c3c8bf]/30 w-fit">
                    <span className="material-symbols-outlined text-[#4a6549] dark:text-[#ccebc7]">potted_plant</span>
                    <div className="text-xs">
                        <div className="font-bold text-[#1c1c17] dark:text-[#fdf9f0]">Level {user.level}</div>
                        <div className="text-[#434841] dark:text-[#c3c8bf]">{user.title}</div>
                    </div>
                </div>
            </motion.section>

            {/* Living garden scene: sky follows the local clock; residents wander,
          chat when tapped, and cheer whenever you water a habit. */}
            <GardenScene phase={phase} celebrateKey={celebrateKey} />

            {/* Plant a new habit */}
            <motion.button
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                onClick={onOpenPlantModal}
                className="w-full bg-[#4a6549] hover:bg-[#243d24] text-white rounded-2xl py-4 flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(74,101,73,0.18)] mb-8 active:scale-98 transition-all duration-200 cursor-pointer"
            >
                <span className="material-symbols-outlined text-2xl">psychiatry</span>
                <span className="font-bold text-lg">Plant a new habit</span>
            </motion.button>

            {/* Today's Bloom + coach */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="md:col-span-8 bg-[#f1eee5] dark:bg-[#243d24] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 border border-[#c3c8bf]/40 relative overflow-hidden"
                >
                    <div className="flex-1 w-full">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[#4a6549] dark:text-[#ccebc7] text-2xl">local_florist</span>
                            <h2 className="font-bold text-xl sm:text-2xl text-[#1c1c17] dark:text-[#ccebc7]">Today's Bloom</h2>
                        </div>
                        <p className="text-sm sm:text-base text-[#434841] dark:text-[#c3c8bf] mb-4">
                            You've nurtured {completedCount} out of {totalCount} habits today.{" "}
                            {bloomPercentage >= 80 ? "Your garden is in full bloom! 🌸" : "Keep watering your seeds to watch them thrive!"}
                        </p>
                        <div className="w-full h-3 bg-[#e6e2d9] dark:bg-[#1e331e] rounded-full overflow-hidden p-0.5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${bloomPercentage}%` }}
                                transition={{ duration: 0.8 }}
                                className="h-full bg-[#4a6549] dark:bg-[#ccebc7] rounded-full"
                            />
                        </div>
                    </div>
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#eafbe4] dark:bg-[#1e331e] border-4 border-[#ece8df] dark:border-[#2c3b2b] flex items-end justify-center shrink-0 shadow-inner overflow-hidden">
                        <PixelPlant stage={bloomPercentage >= 80 ? 5 : 3} species="sunflower" size={96} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-4 bg-[#f1eee5] dark:bg-[#243d24] rounded-3xl p-6 shadow-sm flex flex-col justify-between border border-[#c3c8bf]/40"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-[#4a6549] dark:text-[#ccebc7]">self_improvement</span>
                            <h3 className="font-bold text-lg text-[#1c1c17] dark:text-[#ccebc7]">Growth Coach</h3>
                        </div>
                        <p className="text-sm text-[#434841] dark:text-[#c3c8bf] mb-4">
                            Ask for gentle, personal advice on building and keeping your habits.
                        </p>
                    </div>
                    <button
                        onClick={onOpenCoach}
                        className="bg-[#4a6549] text-white py-2.5 px-4 rounded-full font-bold text-sm hover:bg-[#243d24] active:scale-95 transition-all flex items-center gap-2 w-fit shadow-sm"
                    >
                        <span className="material-symbols-outlined text-base">psychology</span>
                        <span>Ask Growth Coach</span>
                    </button>
                </motion.div>
            </div>

            {/* Plots */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-4"
            >
                <h2 className="font-bold text-xl sm:text-2xl text-[#1c1c17] dark:text-[#ccebc7]">Your Garden Plots</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {habits.map((habit) => {
                        const p = plantOf(habit);
                        return (
                            <motion.div
                                key={habit.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSelectHabit(habit)}
                                className={`rounded-3xl p-5 shadow-sm border transition-all cursor-pointer flex flex-col justify-between aspect-square relative overflow-hidden ${habit.completedToday
                                        ? "bg-[#8ba888] dark:bg-[#2c3b2b] border-[#4a6549]/40 text-[#243d24] dark:text-[#ccebc7]"
                                        : "bg-[#f1eee5] dark:bg-[#243d24] border-[#c3c8bf]/40 text-[#1c1c17] dark:text-[#fdf9f0]"
                                    }`}
                            >
                                <div className="flex justify-between items-start z-10">
                                    <div
                                        className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${habit.completedToday ? "bg-white/60 dark:bg-black/30 text-[#243d24] dark:text-[#ccebc7]" : "bg-[#8ba888] text-[#243d24]"
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-[14px]">{habit.icon}</span>
                                        <span>{habit.category}</span>
                                    </div>
                                    {habit.completedToday ? (
                                        <span className="material-symbols-outlined text-[#4a6549] dark:text-[#ccebc7] text-2xl filled">check_circle</span>
                                    ) : (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onWaterHabit(habit.id); }}
                                            title="Water habit"
                                            className="text-[#434841] dark:text-[#c3c8bf] hover:text-[#4a6549] dark:hover:text-white p-1"
                                        >
                                            <span className="material-symbols-outlined text-2xl">water_drop</span>
                                        </button>
                                    )}
                                </div>

                                <div className="flex flex-col items-center justify-center flex-grow my-2 z-10 text-center">
                                    <PixelPlant stage={p.stage} species={p.species} size={64} />
                                    <h3 className="font-bold text-base sm:text-lg leading-tight line-clamp-2 mt-1.5">{habit.title}</h3>
                                    <span className="text-xs font-semibold opacity-80 mt-1">
                                        {habit.completedToday ? "Completed! ✨" : `${habit.streak} day streak`}
                                    </span>
                                </div>

                                <div className="w-full bg-[#c3c8bf]/40 rounded-full h-2 z-10">
                                    <div
                                        className="bg-[#4a6549] dark:bg-[#ccebc7] h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${habit.progress}%` }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onOpenPlantModal}
                        className="bg-[#f7f3ea] dark:bg-[#1e331e] border-2 border-dashed border-[#c3c8bf] dark:border-[#737970] rounded-3xl p-5 relative flex flex-col items-center justify-center aspect-square cursor-pointer hover:bg-[#f1eee5] dark:hover:bg-[#243d24] transition-colors"
                    >
                        <span className="material-symbols-outlined text-4xl text-[#737970] mb-2">add</span>
                        <h3 className="font-bold text-sm text-[#737970] dark:text-[#c3c8bf] text-center">Empty Plot</h3>
                        <span className="text-xs text-[#737970] mt-1">Plant new seed</span>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};
export default GardenView;