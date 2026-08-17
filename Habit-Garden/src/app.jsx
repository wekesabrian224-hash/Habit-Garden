import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import LoginView from "./components/Khisha/LoginView";
import ProfileView from "./components/Khisha/ProfileView";

import GardenView from "./components/chok/GardenView.jsx";
import GrowthCoachView from "./components/chok/GrowthCoachView.jsx";

import HeroView from "./components/lucky/HeroView";
import ShopView from "./components/lucky/ShopView";
import { PixelPlant } from "./components/lucky/Garden/Plants.jsx";

import Navbar from "./components/victor/Navbar";
import BottomNav from "./components/victor/BottomNav";

import { PlantDetailModal } from "./components/Daniella/PlantDetailModal";
import { PlantHabitModal } from "./components/Daniella/PlantHabitModal";

function ShambaView() {
  return (
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      <h1>Your Garden</h1>
      <p>This is where your habit plants live.</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <PixelPlant species="sunflower" size={100} />
        <PixelPlant species="rose" size={100} />
        <PixelPlant species="herb" size={100} />
      </div>
    </div>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(false);

  const user = JSON.parse(localStorage.getItem("hg_user")) || {
    isLoggedIn: false,
    coins: 250,
    gems: 18,
  };

  const activeTab =
    location.pathname === "/profile"
      ? "profile"
      : location.pathname === "/garden"
        ? "garden"
        : location.pathname === "/growth"
          ? "growth"
          : location.pathname === "/shop"
            ? "shop"
            : "hero";

  const setActiveTab = (tab) => {
    navigate(`/${tab}`);
  };

  if (location.pathname === "/login") {
    return <LoginView />;
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
      />
      {activeTab === "hero" && <HeroView setActiveTab={setActiveTab} />}

      {activeTab === "garden" && <GardenView />}

      {activeTab === "growth" && <GrowthCoachView habits={[]} />}

      {activeTab === "shop" && <ShopView user={user} />}

      {activeTab === "profile" && <ProfileView />}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/*" element={<AppContent />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
