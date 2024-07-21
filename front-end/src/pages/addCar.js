import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddCar = () => {
  const [licenseNo, setLicenseNo] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [image, setImage] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Show SweetAlert confirmation dialog
    const { value: confirm } = await Swal.fire({
      title: 'Do you want to add this car?',
      showCancelButton: true,
      confirmButtonText: 'Add Car',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
    });

    if (confirm) {
      const newCar = {
        licenseNo,
        carBrand: brand,
        carModel: model,
        carImg: image,
        note,
      };

      try {
        const response = await fetch('http://localhost:3030/cars', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCar),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Car added:', result);
          Swal.fire('Success!', 'Car added successfully!', 'success');
          // Clear form after successful submission
          setLicenseNo('');
          setBrand('');
          setModel('');
          setImage('');
          setNote('');
        } else {
          console.error('Failed to add car');
          Swal.fire('Error!', 'Failed to add car', 'error');
        }
      } catch (error) {
        console.error('Error adding car:', error);
        Swal.fire('Error!', 'Error adding car', 'error');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">License No.</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded" 
            value={licenseNo} 
            onChange={(e) => setLicenseNo(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Brand</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded" 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Model</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded" 
            value={model} 
            onChange={(e) => setModel(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Note</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded" 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
