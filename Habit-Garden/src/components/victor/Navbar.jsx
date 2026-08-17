const Navbar = ({ darkMode, setDarkMode, activeTab, setActiveTab, user }) => {
  const showCurrency =
    user?.isLoggedIn && activeTab !== "hero" && activeTab !== "login";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        backgroundColor: darkMode ? "#1B2B1B" : "#fdf9f0",
        borderBottom: `1px solid ${darkMode ? "#2c3b2b" : "#ece8df"}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          height: "64px",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => setActiveTab("hero")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
            fontSize: "24px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "inherit",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "30px" }}
          >
            potted_plant
          </span>
          Habit Garden
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Currency */}
          {showCurrency && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "6px 12px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 600,
                backgroundColor: darkMode ? "#243d24" : "#f7f3ea",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  color: darkMode ? "#ffb690" : "#885031",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px" }}
                >
                  monetization_on
                </span>
                {user.coins}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  color: darkMode ? "#ccebc7" : "#4a6549",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px" }}
                >
                  diamond
                </span>
                {user.gems}
              </div>
            </div>
          )}

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "8px",
              borderRadius: "9999px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: darkMode ? "#ccebc7" : "#4a6549",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              {darkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>

          {/* Avatar / Sign In */}
          {user?.isLoggedIn ? (
            <button
              onClick={() => setActiveTab("profile")}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "9999px",
                overflow: "hidden",
                border: "2px solid #ccebc7",
                padding: 0,
                background: "none",
                cursor: "pointer",
              }}
            >
              <Avatar cfg={USER_AVATAR} size={36} />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab("login")}
              style={{
                padding: "6px 16px",
                fontSize: "12px",
                fontWeight: "bold",
                borderRadius: "9999px",
                backgroundColor: "#4a6549",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
