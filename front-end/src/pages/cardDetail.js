// pages/DetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/24/solid'; // Import the edit icon

const DetailPage = () => {
  const { id } = useParams(); // Extract ID from URL parameters
  const [car, setCar] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3030/cars/${id}`);
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car) return <div>Loading...</div>;

  const handleEdit = () => {
    // Navigate to the edit page with the car ID
    navigate(`/edit-car/${id}`);
  };

  return (
    <div className="relative p-4 max-w-lg mx-auto bg-white rounded shadow-md">
      <button 
        onClick={handleEdit} 
        className="absolute top-2 right-2 p-2 text-blue-600 hover:text-blue-800 transition"
      >
        <PencilIcon className="w-6 h-6" />
      </button>
      <h1 className="text-3xl font-bold mb-4">Car Details</h1>
      <p><strong>License No:</strong> {car.licenseNo}</p>
      <p><strong>Brand:</strong> {car.carBrand}</p>
      <p><strong>Model:</strong> {car.carModel}</p>
      <p><strong>Note:</strong> {car.note}</p>
      {car.carImg && <img src={car.carImg} alt={car.carBrand} className="w-full h-48 object-cover mt-4" />}
    </div>
  );
};

export default DetailPage;
