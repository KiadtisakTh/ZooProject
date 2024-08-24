import React from 'react';
import './css/AnimalCard.css';  // ตรวจสอบเส้นทางนี้ให้ถูกต้อง

function AnimalCard({ animal }) {
  return (
    <div className="card">
      <img src={animal.image} alt={animal.name} className="animal-image" />
      <div className="animal-info">
        <h3>ชื่อ: {animal.name}</h3>
        <p>สายพันธุ์: {animal.species}</p>
        <p>อายุ: {animal.age} ปี</p>
        <p>คำอธิบายเพิ่มเติม: {animal.description}</p>
      </div>
    </div>
  );
}

export default AnimalCard;
