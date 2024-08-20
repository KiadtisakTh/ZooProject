import React from 'react';
import { Link } from 'react-router-dom';  // นำเข้า Link จาก react-router-dom
import './css/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">Zoo Animals</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>  {/* เปลี่ยนจาก {% url 'login' %} เป็น /login */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
