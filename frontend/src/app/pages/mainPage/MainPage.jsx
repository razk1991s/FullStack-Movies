// src/features/main/Main.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./mainPage.scss";

export default function Main() {
  const navigate = useNavigate();

  const reduxUser = useSelector?.((state) => state?.auth?.user);

  let localUser = null;
  try {
    const raw = localStorage.getItem("user");
    if (raw) localUser = JSON.parse(raw);
  } catch (e) {
    localUser = null;
  }

  const user = reduxUser || localUser || null;

  const isSysAdmin =
    user?.role === "sysAdmin" ||
    (Array.isArray(user?.permissions) &&
      user.permissions.includes("Manage Users"));

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <main className="cms-main-root" role="main" aria-labelledby="main-heading">
      <div className="cms-card">
        <h1 id="main-heading" className="cms-title">
          Cinema Management
        </h1>

        <p className="cms-sub">Choose an area to manage</p>

        <nav className="cms-menu" aria-label="Main menu">
          <button
            className="cms-menu-item"
            onClick={() => handleNavigate("/movies")}
            aria-label="Movies"
          >
            <div className="cms-item-icon">🎬</div>
            <div className="cms-item-text">
              <div className="cms-item-title">Movies</div>
              <div className="cms-item-desc">View and manage movies</div>
            </div>
          </button>

          <button
            className="cms-menu-item"
            onClick={() => handleNavigate("/subscriptions")}
            aria-label="Subscriptions"
          >
            <div className="cms-item-icon">📺</div>
            <div className="cms-item-text">
              <div className="cms-item-title">Subscriptions</div>
              <div className="cms-item-desc">Manage member subscriptions</div>
            </div>
          </button>

          {isSysAdmin && (
            <button
              className="cms-menu-item"
              onClick={() => handleNavigate("/manage-users")}
              aria-label="Manage Users"
            >
              <div className="cms-item-icon">👥</div>
              <div className="cms-item-text">
                <div className="cms-item-title">Manage Users</div>
                <div className="cms-item-desc">
                  Create, edit and remove users
                </div>
              </div>
            </button>
          )}
        </nav>

        <div className="cms-footer">
          <Link to="../profile/Profile.jsx" className="cms-link">
            My Profile
          </Link>
          <span className="cms-sep">•</span>
          <Link to="../help/Help.jsx" className="cms-link">
            Help
          </Link>
        </div>
      </div>
    </main>
  );
}
