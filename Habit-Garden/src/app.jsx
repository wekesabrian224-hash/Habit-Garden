import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginView from "./components/Khisha/LoginView";
import ProfileView from "./components/Khisha/ProfileView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<LoginView />}
        />

        <Route
          path="/profile"
          element={<ProfileView />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;