import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    navigate('/'); // Navigate to Home page
    window.location.reload(); // Optionally, force a page reload
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/" className="hover:text-gray-400">Car App</Link>
        </div>
        <div>
          <a href="/" onClick={handleHomeClick} className="text-white mx-4 hover:text-gray-400">Home</a>
          <Link to="/add-car" className="text-white mx-4 hover:text-gray-400">Add Car</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
