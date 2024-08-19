import React, { useEffect, useState } from 'react';
import AnimalCard from './components/AnimalCard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'; // นำเข้าไฟล์ CSS ถ้าคุณแยกเก็บไว้ต่างหาก

function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/animals/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setAnimals(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-4xl text-center my-8">Zoo Animals</h1>
        <div className="grid">
          {animals.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;