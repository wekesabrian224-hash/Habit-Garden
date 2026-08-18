import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignup = () => {
    setMessage("");
    setIsSuccess(false);

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    const existingUser = localStorage.getItem("hg_user");

    if (existingUser) {
      const savedUser = JSON.parse(existingUser);

      if (savedUser.email === cleanEmail) {
        setMessage("An account with this email already exists.");
        return;
      }
    }

    const newUser = {
      name: name.trim() || cleanEmail.split("@")[0],
      email: cleanEmail,
      password,
      darkMode: false,
      reminders: true,
      currentHabit: "Drink Water",
      streak: 0,
      checkIns: 0,
      plantGrowth: 0,
      points: 0,
    };

    localStorage.setItem("hg_user", JSON.stringify(newUser));

    setIsSignup(false);
    setName("");
    setEmail("");
    setPassword("");

    setMessage("Account created successfully. Please log in.");
    setIsSuccess(true);
  };

  const handleLogin = () => {
    setMessage("");
    setIsSuccess(false);

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    const storedUser = localStorage.getItem("hg_user");

    if (!storedUser) {
      setMessage("No account found. Please sign up first.");
      return;
    }

    const savedUser = JSON.parse(storedUser);

    if (savedUser.email === cleanEmail && savedUser.password === password) {
      localStorage.setItem("hg_loggedIn", "true");

      navigate("/profile");
    } else {
      setMessage("Incorrect email or password.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
    setMessage("");
    setIsSuccess(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🌱</div>

        <h1>Habit Garden</h1>

        <p className="auth-subtitle">
          {isSignup
            ? "Create your garden and start growing better habits."
            : "Welcome back. Your garden is waiting for you."}
        </p>

        {message && (
          <div className={`message ${isSuccess ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label htmlFor="name">Your name</label>

              <input
                id="name"
                type="text"
                placeholder="e.g. Lakhisha"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email address</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            {isSignup ? "Create My Garden" : "Enter My Garden"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={toggleMode}>{isSignup ? "Log in" : "Create one"}</span>
        </p>

        <div className="auth-footer">🌿 Small habits. Meaningful growth.</div>
      </div>
    </div>
  );
}

export default LoginPage;
