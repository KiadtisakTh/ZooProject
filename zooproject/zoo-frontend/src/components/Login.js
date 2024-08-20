import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';  // นำเข้าไฟล์ CSS ที่สร้างขึ้น

// ฟังก์ชันสำหรับดึงค่า CSRF token จาก cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // ตรวจสอบว่า cookie นี้ตรงกับชื่อที่ต้องการหรือไม่
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการเปลี่ยนเส้นทาง

  const csrftoken = getCookie('csrftoken');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
        setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,  // ส่ง CSRF token ไปด้วยถ้าจำเป็น
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setError('');
            navigate('/');  // เปลี่ยนเส้นทางไปยังหน้าหลักเมื่อเข้าสู่ระบบสำเร็จ
        } else {
            setError(data.message || 'Login failed');
        }
    } catch (error) {
        setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
};


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
