import React, { useEffect, useState } from 'react';
import AnimalCard from './components/AnimalCard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
      <div className="container mx-auto p-4">
        <h1 className="text-4xl text-center my-8">Zoo Animals</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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