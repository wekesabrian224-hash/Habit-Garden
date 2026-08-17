import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ShopView from "./components/lucky/ShopView";
import HeroView from "./components/lucky/HeroView";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShopView />
    <HeroView />
  </StrictMode>,
);
