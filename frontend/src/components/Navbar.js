import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/" style={{ color: "inherit", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logo} alt="logo" className="nav-logo-img" />
          <span color="white">Portfolio</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/certificates">Certificates</Link>
        </li>
        <li>
          <Link to="/contact">Connect</Link>
        </li>
      </ul>
    </nav>
  );
}
