import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้สำหรับเปลี่ยนเส้นทางหลังจาก logout
import './css/Navbar.css';

function Navbar() {
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedIsAdmin = localStorage.getItem('is_admin') === 'true';
    if (storedUsername) {
      setUsername(storedUsername);
      setIsAdmin(storedIsAdmin);
    }
  }, []);

  const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (response.ok) {
            // ลบข้อมูลออกจาก localStorage
            localStorage.removeItem('username');
            localStorage.removeItem('is_admin');
            
            // รีเซ็ตสถานะใน React
            setUsername(null);
            setIsAdmin(false);

            // เปลี่ยนเส้นทางไปยังหน้า login
            navigate('/login');
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">Zoo Animals</div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          {isAdmin ? (
            <>
              <li><a href="/CrudPage">Create</a></li>
              <li>Welcome, {username}</li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          ) : (
            username ? (
              <>
                <li>Welcome, {username}</li>
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
              </>
            ) : (
              <li><a href="/login">Login</a></li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
