import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <style>{`
        * {
          box-sizing: border-box;
        }

        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
          background:
            radial-gradient(
              circle at top left,
              #dcebd8 0%,
              transparent 35%
            ),
            radial-gradient(
              circle at bottom right,
              #e8f0e3 0%,
              transparent 35%
            ),
            #f7f9f5;
          font-family: Arial, sans-serif;
          color: #29432c;
        }

        .auth-card {
          width: 100%;
          max-width: 430px;
          padding: 42px 38px;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid #e1eadf;
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(48, 76, 48, 0.12);
          text-align: center;
        }

        .auth-logo {
          width: 70px;
          height: 70px;
          margin: 0 auto 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 22px;
          background: #e2efdf;
          font-size: 36px;
          box-shadow: 0 8px 20px rgba(61, 122, 74, 0.1);
        }

        .auth-card h1 {
          margin: 0;
          color: #29432c;
          font-size: 28px;
        }

        .auth-subtitle {
          margin: 8px 0 30px;
          color: #718071;
          font-size: 14px;
          line-height: 1.5;
        }

        .form-group {
          margin-bottom: 16px;
          text-align: left;
        }

        .form-group label {
          display: block;
          margin-bottom: 7px;
          color: #526553;
          font-size: 13px;
          font-weight: 600;
        }

        .form-group input {
          width: 100%;
          padding: 13px 15px;
          border: 1px solid #dce5d8;
          border-radius: 12px;
          background: #fbfcfa;
          color: #29432c;
          font-size: 14px;
          outline: none;
        }

        .form-group input:focus {
          border-color: #70a970;
          background: white;
          box-shadow: 0 0 0 3px rgba(112, 169, 112, 0.12);
        }

        .form-group input::placeholder {
          color: #a0aaa0;
        }

        .message {
          margin-bottom: 18px;
          padding: 11px 13px;
          border-radius: 10px;
          font-size: 13px;
          line-height: 1.4;
        }

        .message.error {
          background: #fceaea;
          color: #a52b2b;
        }

        .message.success {
          background: #e9f5e8;
          color: #356b35;
        }

        .auth-btn {
          width: 100%;
          margin-top: 5px;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: #4f8755;
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .auth-btn:hover {
          background: #3d7044;
          transform: translateY(-1px);
        }

        .auth-switch {
          margin: 24px 0 0;
          color: #718071;
          font-size: 13px;
        }

        .auth-switch span {
          color: #3d7044;
          font-weight: 700;
          cursor: pointer;
        }

        .auth-switch span:hover {
          text-decoration: underline;
        }

        .auth-footer {
          margin-top: 24px;
          color: #9aa59a;
          font-size: 11px;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 35px 24px;
            border-radius: 20px;
          }
        }
      `}</style>

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
