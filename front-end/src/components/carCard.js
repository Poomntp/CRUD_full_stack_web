import React from 'react';

const Card = ({ title, description }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:bg-gray-200">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
        <p className="mt-2 text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default Card;
