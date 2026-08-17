import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import BottomNav from "./components/victor/BottomNav";
import Navbar from "./components/victor/Navbar";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BottomNav />
    <Navbar />
  </StrictMode>,
);
