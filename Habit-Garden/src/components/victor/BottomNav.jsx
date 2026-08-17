const BottomNav = ({ activeTab, setActiveTab }) => {
  if (activeTab === "hero") {
    return null;
  }

  const navItems = [
    { id: "garden", label: "Garden", icon: "local_florist" },
    { id: "growth", label: "Growth", icon: "trending_up" },
    { id: "shop", label: "Shop", icon: "storefront" },
    { id: "profile", label: "Profile", icon: "person" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fdf9f0",
        borderTop: "1px solid #ece8df",
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "80px",
          padding: "0 16px",
        }}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: isActive ? "#4a6549" : "#6b7280",
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              <div
                className="material-symbols-outlined"
                style={{
                  fontSize: "28px",
                  color: isActive ? "#4a6549" : "#6b7280",
                }}
              >
                {item.icon}
              </div>
              <div style={{ fontSize: "12px", fontWeight: 600 }}>
                {item.label}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
