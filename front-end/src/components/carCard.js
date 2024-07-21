import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, imageUrl, onDelete, license, id }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/detail/${id}`); // Navigate to detail page with id
  };

  return (
    <div className="relative w-80 bg-white rounded-xl shadow-md overflow-hidden hover:bg-gray-200">
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover" 
        />
      )}
      <button 
        onClick={onDelete} 
        className="absolute top-2 right-2 p-1 text-red-600 hover:text-red-900 transition"
      >
        <TrashIcon className="w-6 h-6" />
      </button>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
        <p className="mt-2 text-gray-500">{description}</p>
        <div className="flex items-center justify-between mt-2 text-gray-500">
          <p>{license}</p>
          <button 
            onClick={handleDetailClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
