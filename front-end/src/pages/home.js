// pages/Home.js
import React from 'react';
import Card from '../components/carCard';

const Home = ({ cars, handleDelete}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
      {cars.map((car) => (
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
  );
};

export default Home;
