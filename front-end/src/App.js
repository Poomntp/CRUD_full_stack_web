import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import AddCar from './pages/addCar';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import DetailPage from './pages/cardDetail';
import EditCar from './pages/editCar';

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3030/cars');
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Do you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3030/cars/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            const result = await response.json();
            Swal.fire('Deleted!', result.message, 'success');
            setCars((prevCars) => prevCars.filter((car) => car.id !== id));
          } else {
            Swal.fire('Error!', 'Failed to delete car', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete car', 'error');
        }
      }
    });
  };

  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home cars={cars} handleDelete={handleDelete} imageUrl={cars.carImg} license={cars.licenseNo} id={cars.id}/>} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/edit-car/:id" element={<EditCar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
