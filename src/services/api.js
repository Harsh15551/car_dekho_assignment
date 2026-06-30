// API Service
// Functions for making API calls to the backend

const API_BASE_URL = 'http://localhost:5000/api';

export const carService = {
  getAllCars: async () => {
    const response = await fetch(`${API_BASE_URL}/cars`);
    return response.json();
  },
  
  getCarById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`);
    return response.json();
  },
  
  createCar: async (carData) => {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData)
    });
    return response.json();
  },
  
  updateCar: async (id, carData) => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData)
    });
    return response.json();
  },
  
  deleteCar: async (id) => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};
