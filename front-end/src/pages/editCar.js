// pages/EditCar.js
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

const EditCar = () => {
  const { id } = useParams();
  const [licenseNo, setLicenseNo] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [image, setImage] = useState('');
  const [note, setNote] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3030/cars/${id}`);
        const data = await response.json();
        setLicenseNo(data.licenseNo);
        setBrand(data.carBrand);
        setModel(data.carModel);
        setImage(data.carImg);
        setNote(data.note);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Show SweetAlert confirmation dialog
    const { value: confirm } = await Swal.fire({
      title: 'Do you want to update this car?',
      showCancelButton: true,
      confirmButtonText: 'Update Car',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
    });

    if (confirm) {
      const updatedCar = {
        licenseNo,
        carBrand: brand,
        carModel: model,
        carImg: image,
        note,
      };

      try {
        const response = await fetch(`http://localhost:3030/cars/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCar),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Car updated:', result);
          Swal.fire('Success!', 'Car updated successfully!', 'success');
          
          navigate(`/detail/${id}`, { replace: true }); // replace: true ensures that this navigation does not create a new entry in the history stack
        } else {
          console.error('Failed to update car');
          Swal.fire('Error!', 'Failed to update car', 'error');
        }
      } catch (error) {
        console.error('Error updating car:', error);
        Swal.fire('Error!', 'Error updating car', 'error');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Car</h2>
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
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update Car</button>
      </form>
    </div>
  );
};

export default EditCar;
