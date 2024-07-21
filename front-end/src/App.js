import './App.css';
import Card from './components/carCard';
import { useEffect, useState } from 'react';

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

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      {cars.map((car) => (
        <Card key={car.id} title={car.carBrand} description={`Model: ${car.carModel}`} />
      ))}
    </div>
  );
}

export default App;
