// src/components/AnimalCard.js
import React from 'react';

const AnimalCard = ({ animal }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-500">
            <img className="w-full" src={animal.image} alt={animal.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-red-500">{animal.name}</div>
                <p className="text-gray-700 text-base">
                    Species: {animal.species}
                </p>
                <p className="text-gray-700 text-base">
                    Age: {animal.age}
                </p>
                <p className="text-gray-700 text-base">
                    {animal.description}
                </p>
            </div>
        </div>
    );
}

export default AnimalCard;
