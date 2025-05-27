// components/Header.js
import React from "react";
import logo from "../assets/hydro_logo.png";
import "../styles/App.css";

const Header = ({ onAuthClick, onNavigate }) => {
  return (
    <header className="header">
      <div className="header-left" onClick={() => onNavigate("home")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="HydroMind Logo" className="dashboard-logo" />
        <span className="logo-text">HydroMind</span>
      </div>
      <nav className="header-nav">
        <button onClick={() => onNavigate("home")}>Inicio</button>
        <button onClick={() => onNavigate("sobre-nosotros")}>Sobre nosotros</button>
        <button onClick={() => onNavigate("contacto")}>Contáctanos</button>
        <button onClick={onAuthClick}>
          Inicia sesión / Regístrate
        </button>
      </nav>
    </header>
  );
};

export default Header;

