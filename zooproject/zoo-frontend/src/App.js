import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // เปลี่ยนจาก Switch เป็น Routes
import AnimalCard from './components/AnimalCard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login'; // นำเข้าคอมโพเนนต์ Login
import './App.css';

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
    <Router>
      <Navbar />
      <div className="container">
        <Routes> {/* เปลี่ยนจาก Switch เป็น Routes */}
          <Route path="/" element={(
            <>
              <h1 className="text-4xl text-center my-8">Zoo Animals</h1>
              <div className="grid">
                {animals.map(animal => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>
            </>
          )} />
          <Route path="/login" element={<Login />} /> {/* เปลี่ยนจาก component เป็น element */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
