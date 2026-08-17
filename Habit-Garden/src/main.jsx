import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ShopView from "./components/lucky/ShopView";
import HeroView from "./components/lucky/HeroView";
import BottomNav from "./components/victor/BottomNav";
import Navbar from "./components/victor/Navbar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <ShopView />
    <HeroView />
    <BottomNav />
  </StrictMode>
);

  </StrictMode>,
);
