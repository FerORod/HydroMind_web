// components/DashboardHeader.js
import React, { useState } from "react";
import logo from "../assets/hydro_logo.png";
import "../styles/App.css";

const DashboardHeader = ({ user, onLogout, onViewChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="dashboard-header">
      <div className="dashboard-left">
        <img src={logo} alt="HydroMind Logo" className="dashboard-logo" />
        <span className="welcome-text">Bienvenido, {user.user}</span>
      </div>

      <nav className="dashboard-nav">
        <div className="nav-buttons">
          <button onClick={() => onViewChange("hoy")}>Inicio</button>
          <button onClick={() => onViewChange("historial")}>Historial</button>

          <div
            className="user-menu"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button>Usuario ▾</button>
            {showDropdown && (
              <div className="dropdown">
                <button onClick={onLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;

