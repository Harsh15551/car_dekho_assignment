import React, { useState } from 'react'

const PreferenceForm = ({ onSearch }) => {
  const [preferences, setPreferences] = useState({
    budgetMin: '25000',
    budgetMax: '30000',
    fuelType: '',
    safety_ratings: '5',
    seating_capacity: '5',
    priority: []
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePriorityChange = (e) => {
    const value = e.target.value
    setPreferences(prev => {
      const newPriority = prev.priority.includes(value)
        ? prev.priority.filter(p => p !== value)
        : [...prev.priority, value]
      return { ...prev, priority: newPriority }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const budgetMin = preferences.budgetMin ? parseInt(preferences.budgetMin) : null
    const budgetMax = preferences.budgetMax ? parseInt(preferences.budgetMax) : null

    // Validate budget range
    if (budgetMin && budgetMax && budgetMin > budgetMax) {
      setError('Minimum price must be less than or equal to maximum price')
      return
    }

    const searchPreferences = {
      ...preferences,
      budgetMin,
      budgetMax,
      safety_ratings: preferences.safety_ratings ? parseInt(preferences.safety_ratings) : 5,
      seating_capacity: preferences.seating_capacity ? parseInt(preferences.seating_capacity) : 5,
    }
    onSearch(searchPreferences)
  }

  return (
    <div className="preference-form">
      <h2>Find Your Perfect Car</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Budget Range</label>
          <div className="budget-inputs">
            <input
              type="number"
              name="budgetMin"
              placeholder="Min Price"
              value={preferences.budgetMin}
              onChange={handleChange}
            />
            <span>to</span>
            <input
              type="number"
              name="budgetMax"
              placeholder="Max Price"
              value={preferences.budgetMax}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Fuel Type</label>
          <select name="fuelType" value={preferences.fuelType} onChange={handleChange}>
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="form-group">
          <label>Safety Rating (1-5)</label>
          <input
            type="number"
            name="safety_ratings"
            min="1"
            max="5"
            placeholder="Safety Rating"
            value={preferences.safety_ratings}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Seating Capacity</label>
          <select name="seating_capacity" value={preferences.seating_capacity} onChange={handleChange}>
            <option value="">Select Capacity</option>
            <option value="2">2 Seats</option>
            <option value="4">4 Seats</option>
            <option value="5">5 Seats</option>
            <option value="7">7 Seats</option>
            <option value="7">10 Seats</option>
          </select>
        </div>

        <div className="form-group">
          <label>Priorities (select multiple)</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="mileage"
                checked={preferences.priority.includes('mileage')}
                onChange={handlePriorityChange}
              />
              Mileage
            </label>
            <label>
              <input
                type="checkbox"
                value="safety"
                checked={preferences.priority.includes('safety')}
                onChange={handlePriorityChange}
              />
              Safety
            </label>
            <label>
              <input
                type="checkbox"
                value="price"
                checked={preferences.priority.includes('price')}
                onChange={handlePriorityChange}
              />
              Price
            </label>
            <label>
              <input
                type="checkbox"
                value="features"
                checked={preferences.priority.includes('features')}
                onChange={handlePriorityChange}
              />
              Features
            </label>
          </div>
        </div>

        <button type="submit" className="search-btn">Find Cars</button>
      </form>
    </div>
  )
}

export default PreferenceForm
