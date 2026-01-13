// src/features/auth/LoginPage.jsx
import "../loginPage/LoginPage.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, clearError } from "../authSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.from || "/main";
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const action = await dispatch(loginThunk({ username, password }));
      const result = unwrapResult(action);
      navigate(location.state?.from || "/main", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="rs-login-root">
      <div className="rs-login-bg-blob" aria-hidden />

      <div className="rs-card" role="main" aria-labelledby="rs-heading">
        <div className="rs-logo">MOVIES</div>

        <form onSubmit={onSubmit}>
          <div className="rs-field">
            <label className="sr-only" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="rs-input"
              placeholder="Enter your username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="rs-field">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="rs-input"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="rs-field">
            <button className="rs-button" type="submit" disabled={loading}>
              {loading ? "Connecting..." : "Connect"}
            </button>
          </div>

          <div>
            New user?{" "}
            <a className="link" href="/create-account">
              Create Account
            </a>
          </div>

          <div className="rs-divider" />

          {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}
          {location.state?.info && (
            <p style={{ color: "green", marginTop: 12 }}>
              {location.state.info}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
