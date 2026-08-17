import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <style>{`
        * {
          box-sizing: border-box;
        }

        .profile-page {
          min-height: 100vh;
          padding: 45px 20px;
          background: #f7f9f5;
          color: #29432c;
          font-family: Arial, sans-serif;
          transition: 0.3s ease;
        }

        .profile-container {
          width: 100%;
          max-width: 1050px;
          margin: auto;
        }

        .profile-header {
          display: flex;
          align-items: center;
          padding: 30px;
          margin-bottom: 35px;
          background: white;
          border: 1px solid #e1eadf;
          border-radius: 24px;
          box-shadow: 0 8px 25px rgba(48, 76, 48, 0.06);
        }

        .profile-header-info {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .profile-header h1 {
          margin: 0;
          font-size: 30px;
        }

        .profile-header p {
          margin: 8px 0 0;
          color: #718071;
          font-size: 14px;
        }

        .profile-tagline {
          display: block;
          margin-top: 10px;
          color: #718071;
          font-size: 13px;
        }

        .edit-btn {
          padding: 11px 18px;
          border: 1px solid #c9dbc5;
          border-radius: 11px;
          background: white;
          color: #356b35;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .edit-btn:hover {
          background: #edf5eb;
        }

        .edit-form {
          width: 100%;
        }

        .edit-field {
          margin-bottom: 16px;
        }

        .edit-field label {
          display: block;
          margin-bottom: 7px;
          color: #718071;
          font-size: 12px;
          font-weight: 700;
        }

        .edit-field input {
          width: 100%;
          padding: 11px 13px;
          border: 1px solid #dce5d8;
          border-radius: 10px;
          background: #fbfcfa;
          font-size: 14px;
          outline: none;
        }

        .edit-field input:focus {
          border-color: #70a970;
        }

        .edit-actions {
          display: flex;
          gap: 10px;
          margin-top: 18px;
        }

        .save-btn,
        .cancel-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .save-btn {
          background: #4f8755;
          color: white;
        }

        .cancel-btn {
          background: #edf0eb;
          color: #4c574d;
        }

        .section {
          margin-bottom: 35px;
        }

        .section-title {
          margin: 0 0 16px;
          font-size: 20px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .stat {
          padding: 22px;
          background: white;
          border: 1px solid #e1eadf;
          border-radius: 18px;
          box-shadow: 0 5px 18px rgba(48, 76, 48, 0.04);
        }

        .stat-icon {
          font-size: 25px;
        }

        .stat-number {
          margin: 11px 0 3px;
          font-size: 25px;
          font-weight: 700;
        }

        .stat-label {
          margin: 0;
          color: #718071;
          font-size: 12px;
        }

        .habit-card {
          display: flex;
          align-items: center;
          gap: 28px;
          padding: 28px;
          background: white;
          border: 1px solid #e1eadf;
          border-radius: 20px;
          box-shadow: 0 5px 18px rgba(48, 76, 48, 0.04);
        }

        .plant {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          background: #edf5eb;
          font-size: 60px;
        }

        .habit-content {
          flex: 1;
        }

        .habit-content h3 {
          margin: 0 0 7px;
          font-size: 20px;
        }

        .habit-content p {
          margin: 0 0 17px;
          color: #718071;
          font-size: 13px;
        }

        .progress-background {
          width: 100%;
          height: 9px;
          overflow: hidden;
          border-radius: 20px;
          background: #e5ebe3;
        }

        .progress {
          height: 100%;
          border-radius: 20px;
          background: #70a970;
          transition: width 0.4s ease;
        }

        .progress-text {
          display: block;
          margin-top: 7px;
          color: #718071;
          font-size: 11px;
        }

        .achievements {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .achievement {
          display: flex;
          gap: 15px;
          padding: 20px;
          background: white;
          border: 1px solid #e1eadf;
          border-radius: 18px;
          box-shadow: 0 5px 18px rgba(48, 76, 48, 0.04);
        }

        .achievement.locked {
          opacity: 0.45;
        }

        .achievement-icon {
          font-size: 29px;
        }

        .achievement h3 {
          margin: 0;
          font-size: 15px;
        }

        .achievement p {
          margin: 6px 0;
          color: #718071;
          font-size: 12px;
          line-height: 1.4;
        }

        .achievement-status {
          color: #4f8755;
          font-size: 11px;
          font-weight: 700;
        }

        .preferences {
          overflow: hidden;
          background: white;
          border: 1px solid #e1eadf;
          border-radius: 18px;
        }

        .preference {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px;
          border-bottom: 1px solid #e1eadf;
        }

        .preference:last-child {
          border-bottom: none;
        }

        .preference h3 {
          margin: 0;
          font-size: 15px;
        }

        .preference p {
          margin: 5px 0 0;
          color: #718071;
          font-size: 12px;
        }

        .toggle {
          width: 50px;
          height: 28px;
          padding: 3px;
          border: none;
          border-radius: 20px;
          background: #cbd3ca;
          cursor: pointer;
        }

        .toggle-circle {
          display: block;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: white;
          transition: 0.2s ease;
        }

        .toggle.active {
          background: #70a970;
        }

        .toggle.active .toggle-circle {
          transform: translateX(22px);
        }

        .logout {
          width: 100%;
          padding: 14px;
          border: 1px solid #efd0d0;
          border-radius: 12px;
          background: #fff7f7;
          color: #b95757;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .logout:hover {
          background: #fceaea;
        }

        .profile-page.dark {
          background: #172118;
          color: #e6f1e3;
        }

        .dark .profile-header,
        .dark .stat,
        .dark .habit-card,
        .dark .achievement,
        .dark .preferences {
          background: #223024;
          border-color: #344635;
        }

        .dark .profile-header h1,
        .dark .section-title,
        .dark .habit-content h3,
        .dark .achievement h3,
        .dark .preference h3 {
          color: #e6f1e3;
        }

        .dark .profile-header p,
        .dark .profile-tagline,
        .dark .stat-label,
        .dark .habit-content p,
        .dark .progress-text,
        .dark .achievement p,
        .dark .preference p {
          color: #aab9a8;
        }

        .dark .edit-btn {
          background: #223024;
          border-color: #49604a;
          color: #bde0b8;
        }

        .dark .edit-field input {
          background: #172118;
          border-color: #344635;
          color: #e6f1e3;
        }

        .dark .plant {
          background: #2a382b;
        }

        .dark .preference {
          border-color: #344635;
        }

        .dark .cancel-btn {
          background: #2c382d;
          color: #e6f1e3;
        }

        .dark .logout {
          background: #2d2222;
          border-color: #553838;
          color: #e58a8a;
        }

        @media (max-width: 800px) {
          .stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .achievements {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .profile-page {
            padding: 25px 15px;
          }

          .profile-header-info {
            flex-direction: column;
            align-items: flex-start;
          }

          .profile-header h1 {
            font-size: 24px;
          }

          .habit-card {
            flex-direction: column;
            text-align: center;
          }

          .habit-content {
            width: 100%;
          }
        }

        @media (max-width: 450px) {
          .stats {
            grid-template-columns: 1fr;
          }

          .profile-header {
            padding: 22px;
          }

          .preference {
            align-items: flex-start;
          }
        }
      `}</style>

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
