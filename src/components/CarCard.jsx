import React from 'react'

const CarCard = ({ car, showScore = false }) => {
  const getCarImage = (carId) => {
    return `https://via.placeholder.com/400x250/4A90E2/ffffff?text=Car+${carId}`
  }

  return (
    <div className="car-card">
      <img 
        src={getCarImage(car.id)} 
        alt={`${car.make} ${car.model}`}
        className="car-image"
      />
      <div className="car-info">
        <h3>{car.make} {car.model}</h3>
        <p className="car-year">{car.year}</p>
        <p className="car-price">${car.price.toLocaleString()}</p>
        <p className="car-mileage">{car.mileage.toLocaleString()} miles</p>
        <p className="car-fuel">{car.fuelType}</p>
        <p className="car-transmission">{car.transmission}</p>
        <p className="car-safety">Safety Rating: {car.safety_ratings}/5</p>
        <p className="car-seating">Seating: {car.seating_capacity}</p>
        {showScore && car.score && (
          <div className="car-score">
            <p className="score-value">Score: {car.score}</p>
          </div>
        )}
        <div className="car-features">
          {car.features && car.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CarCard
