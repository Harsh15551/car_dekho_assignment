import React, { useState, useEffect } from 'react'
import CarCard from '../components/CarCard'

const CarList = ({ cars: propCars, showScore = false, title = "Available Cars" }) => {
  const [cars, setCars] = useState(propCars || [])
  const [loading, setLoading] = useState(!propCars)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (propCars) {
      setCars(propCars)
      setLoading(false)
    } else {
      fetchAllCars()
    }
  }, [propCars])

  const fetchAllCars = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cars')
      if (!response.ok) {
        throw new Error('Failed to fetch cars')
      }
      const data = await response.json()
      setCars(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="car-list"><p className="loading">Loading cars...</p></div>
  }

  if (error) {
    return <div className="car-list"><p className="error">{error}</p></div>
  }

  return (
    <div className="car-list">
      <h1>{title}</h1>
      <div className="cars-grid">
        {cars && cars.length > 0 ? (
          cars.map(car => (
            <CarCard 
              key={car.id} 
              car={car} 
              showScore={showScore}
            />
          ))
        ) : (
          <p className="no-cars">No cars available</p>
        )}
      </div>
    </div>
  )
}

export default CarList
