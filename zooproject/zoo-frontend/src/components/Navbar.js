// src/components/Navbar.js
import React from 'react';
import './css/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">Zoo Animals</div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/contact">Login</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
