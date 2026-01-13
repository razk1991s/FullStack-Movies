// src/features/auth/createAccountPage/CreateAccount.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "./CreateAccount.scss";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    if (!username.trim()) {
      setError("Please enter your username");
      return false;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.post("/api/create-account", {
        UserName: username,
        Password: password,
      });

      setLoading(false);
      // מניח שהשרת מחזיר { success: true, message: "..." }
      navigate("/login", {
        replace: true,
        state: { info: res.data?.message || "Account created. Please login." },
      });
    } catch (err) {
      setLoading(false);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Activation failed";
      setError(msg);
    }
  };

  return (
    <div className="rs-login-root">
      <div className="rs-login-bg-blob" aria-hidden />

      <div className="rs-card" role="main" aria-labelledby="rs-heading">
        <div className="rs-logo">MOVIES</div>

        <form onSubmit={onSubmit}>
          <h2 id="rs-heading" className="rs-subtitle">
            Create Account
          </h2>

          <div className="rs-field">
            <label className="sr-only" htmlFor="create-username">
              User Name
            </label>
            <input
              id="create-username"
              className="rs-input"
              placeholder="Enter your username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="rs-field">
            <label className="sr-only" htmlFor="create-password">
              Password
            </label>
            <input
              id="create-password"
              type="password"
              className="rs-input"
              placeholder="Choose a password (min 6 chars)"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="rs-field">
            <button className="rs-button" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
          </div>

          <div style={{ marginTop: 8 }}>
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login
            </Link>
          </div>

          <div className="rs-divider" />

          {error && <p className="rs-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
