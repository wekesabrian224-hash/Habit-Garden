import { motion } from "motion/react";
import { PixelPlant } from "./Garden/Plants";
import "./HeroView.css";

function HeroView({ setActiveTab }) {
  return (
    <div className="hero">
      {/* These are just the blurry circles in the background */}
      <div className="blob blob-one"></div>
      <div className="blob blob-two"></div>

      {/* Main text section */}
      <motion.section
        className="hero-text"
        // Start hidden and a little lower
        initial={{ opacity: 0, y: 30 }}
        // Move to the normal position and show it
        animate={{ opacity: 1, y: 0 }}
        // Make the animation take 0.6 seconds
        transition={{ duration: 0.6 }}
      >
        <h1>
          Cultivate real habits.
          <br />
          {/* This part of the heading is green */}
          <span>Watch your virtual garden bloom.</span>
        </h1>

        {/* Short explanation of the app */}
        <p>
          Build healthy routines, grow adorable digital plants, and turn
          self-care into a relaxing daily ritual.
        </p>

        {/* Our two buttons */}
        <div className="buttons">
          {/* Take the user to the garden */}
          <button onClick={() => setActiveTab("garden")}>Get Started →</button>

          {/* Quick demo button */}
          <button className="demo" onClick={() => setActiveTab("garden")}>
            Quick Demo
          </button>
        </div>
      </motion.section>

      {/* The virtual garden */}
      <motion.section
        className="garden"
        // Start a little smaller and invisible
        initial={{ opacity: 0, scale: 0.9 }}
        // Grow into its normal size
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Blue sky */}
        <div className="sky">
          {/* Green ground where our plants sit */}
          <div className="ground">
            {/* A sunflower */}
            <PixelPlant stage={5} species="sunflower" size={120} />

            {/* A rose */}
            <PixelPlant stage={4} species="rose" size={100} />

            {/* An herb */}
            <PixelPlant stage={5} species="herb" size={110} />

            {/* Another sunflower */}
            <PixelPlant stage={3} species="sunflower" size={90} />
          </div>
        </div>
      </motion.section>

      {/* Why people should use the app */}
      <motion.section
        className="features"
        // Start slightly lower
        initial={{ opacity: 0, y: 30 }}
        // Move into place
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Why grow with us?</h2>

        {/* The feature cards */}
        <div className="cards">
          {/* First card */}
          <div className="card">
            <div className="icon">💧</div>

            <h3>Nurturing, Not Judging</h3>

            <p>
              Missed a day? That's okay. Your garden simply rests. We encourage
              you instead of punishing you.
            </p>
          </div>

          {/* Second card */}
          <div className="card card-large">
            {/* A little decoration in the corner */}
            <span className="plant-decoration">🌿</span>

            <div className="icon">📈</div>

            <h3>Tangible Progress</h3>

            <p>
              Every habit you complete helps your digital garden grow into
              something beautiful.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default HeroView;
