// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">School<span>Ease</span></div>
      <nav>
        <ul>
          <li><Link to="/">Add School</Link></li>
          <li><Link to="/show">Show Schools</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
