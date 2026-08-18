import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileView.css";

function ProfilePage() {
  const navigate = useNavigate();

  const savedUser = JSON.parse(localStorage.getItem("hg_user")) || {};

  const [user, setUser] = useState(savedUser);
  const [darkMode, setDarkMode] = useState(savedUser.darkMode || false);
  const [reminders, setReminders] = useState(savedUser.reminders ?? true);

  const [isEditing, setIsEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState(savedUser.name || "");
  const [emailDraft, setEmailDraft] = useState(savedUser.email || "");

  const updateUser = (changes) => {
    const updatedUser = {
      ...user,
      ...changes,
    };

    setUser(updatedUser);
    localStorage.setItem("hg_user", JSON.stringify(updatedUser));
  };

  const startEditing = () => {
    setNameDraft(user.name || "");
    setEmailDraft(user.email || "");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveProfile = () => {
    updateUser({
      name: nameDraft.trim() || "Garden Keeper",
      email: emailDraft.trim(),
    });

    setIsEditing(false);
  };

  const toggleDarkMode = () => {
    const newValue = !darkMode;

    setDarkMode(newValue);

    updateUser({
      darkMode: newValue,
    });
  };

  const toggleReminders = () => {
    const newValue = !reminders;

    setReminders(newValue);

    updateUser({
      reminders: newValue,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("hg_loggedIn");
    navigate("/login");
  };

  const profile = {
    name: user.name || "Garden Keeper",
    email: user.email || "No email added",
    habit: user.currentHabit || "Drink Water",
    streak: user.streak || 0,
    checkIns: user.checkIns || 0,
    growth: user.plantGrowth || 0,
    points: user.points || 0,
  };

  const achievements = [
    {
      icon: "🌱",
      title: "First Seed",
      description: "Complete your first habit check-in.",
      unlocked: profile.checkIns >= 1,
    },
    {
      icon: "🔥",
      title: "7-Day Streak",
      description: "Maintain a 7-day habit streak.",
      unlocked: profile.streak >= 7,
    },
    {
      icon: "🌿",
      title: "Growing Strong",
      description: "Reach 50% plant growth.",
      unlocked: profile.growth >= 50,
    },
  ];

  const getPlant = () => {
    if (profile.growth >= 75) return "🌳";
    if (profile.growth >= 50) return "🌿";
    if (profile.growth >= 25) return "🌱";

    return "🌰";
  };

  return (
    <div className={`profile-page ${darkMode ? "dark" : ""}`}>
      <div className="profile-container">
        {/* PROFILE HEADER */}
        <section className="profile-header">
          {isEditing ? (
            <div className="edit-form">
              <div className="edit-field">
                <label htmlFor="profile-name">Name</label>

                <input
                  id="profile-name"
                  type="text"
                  value={nameDraft}
                  onChange={(event) => setNameDraft(event.target.value)}
                  placeholder="Garden Keeper"
                />
              </div>

              <div className="edit-field">
                <label htmlFor="profile-email">Email</label>

                <input
                  id="profile-email"
                  type="email"
                  value={emailDraft}
                  onChange={(event) => setEmailDraft(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="edit-actions">
                <button
                  type="button"
                  className="save-btn"
                  onClick={saveProfile}
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-header-info">
              <div>
                <h1>My Garden Profile 🌿</h1>

                <p>{profile.email}</p>

                <span className="profile-tagline">
                  Cultivating better habits, one day at a time.
                </span>
              </div>

              <button type="button" className="edit-btn" onClick={startEditing}>
                ✏️ Edit Profile
              </button>
            </div>
          )}
        </section>

        {/* GARDEN STATS */}
        <section className="section">
          <h2 className="section-title">My Garden 🌿</h2>

          <div className="stats">
            <div className="stat">
              <span className="stat-icon">🔥</span>
              <p className="stat-number">{profile.streak}</p>
              <p className="stat-label">Day Streak</p>
            </div>

            <div className="stat">
              <span className="stat-icon">💧</span>
              <p className="stat-number">{profile.checkIns}</p>
              <p className="stat-label">Check-ins</p>
            </div>

            <div className="stat">
              <span className="stat-icon">🌱</span>
              <p className="stat-number">{profile.growth}%</p>
              <p className="stat-label">Plant Growth</p>
            </div>

            <div className="stat">
              <span className="stat-icon">🪙</span>
              <p className="stat-number">{profile.points}</p>
              <p className="stat-label">Garden Points</p>
            </div>
          </div>
        </section>

        {/* CURRENT HABIT */}
        <section className="section">
          <h2 className="section-title">Current Habit 🌱</h2>

          <div className="habit-card">
            <div className="plant">{getPlant()}</div>

            <div className="habit-content">
              <h3>{profile.habit}</h3>

              <p>Your plant is currently {profile.growth}% grown.</p>

              <div className="progress-background">
                <div
                  className="progress"
                  style={{
                    width: `${Math.min(profile.growth, 100)}%`,
                  }}
                />
              </div>

              <span className="progress-text">{profile.growth}% complete</span>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="section">
          <h2 className="section-title">Achievements 🏆</h2>

          <div className="achievements">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className={`achievement ${
                  achievement.unlocked ? "" : "locked"
                }`}
              >
                <div className="achievement-icon">{achievement.icon}</div>

                <div>
                  <h3>{achievement.title}</h3>

                  <p>{achievement.description}</p>

                  <span className="achievement-status">
                    {achievement.unlocked ? "Unlocked ✓" : "Locked 🔒"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PREFERENCES */}
        <section className="section">
          <h2 className="section-title">Preferences ⚙️</h2>

          <div className="preferences">
            <div className="preference">
              <div>
                <h3>🌙 Dark Mode</h3>

                <p>Use a darker appearance for your garden.</p>
              </div>

              <button
                type="button"
                className={`toggle ${darkMode ? "active" : ""}`}
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                <span className="toggle-circle" />
              </button>
            </div>

            <div className="preference">
              <div>
                <h3>🔔 Habit Reminders</h3>

                <p>Receive reminders to complete your habits.</p>
              </div>

              <button
                type="button"
                className={`toggle ${reminders ? "active" : ""}`}
                onClick={toggleReminders}
                aria-label="Toggle habit reminders"
              >
                <span className="toggle-circle" />
              </button>
            </div>
          </div>
        </section>

        {/* LOGOUT */}
        <section className="section">
          <button type="button" className="logout" onClick={handleLogout}>
            🚪 Log Out
          </button>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
