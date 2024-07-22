// pages/Home.js
import React, { useState } from 'react';
import Card from '../components/carCard';

const Home = ({ cars, handleDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const filteredCars = cars.filter(car =>
    car.carBrand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.licenseNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by brand, model, or license..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded w-full max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
        {filteredCars.map((car) => (
          <Card
            key={car.id}
            title={car.carBrand}
            description={`Model: ${car.carModel}`}
            imageUrl={car.carImg}
            onDelete={() => handleDelete(car.id)}
            license={car.licenseNo}
            id={car.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
