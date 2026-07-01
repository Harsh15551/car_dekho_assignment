import React, { useState } from 'react'
import PreferenceForm from '../components/PreferenceForm'
import CarList from './CarList'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const Home = () => {
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (preferences) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_URL}/api/cars/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      })
      
      if (!response.ok) {
        throw new Error('Failed to search cars')
      }
      
      const data = await response.json()
      const cars = data.map(result => ({
        ...result.car,
        score: result.score
      }))
      setSearchResults(cars)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>Find Your Perfect Car</h1>
        <p>Tell us your preferences and we'll find the best matches for you</p>
      </div>
      
      <div className="home-content">
        <div className="form-section">
          <PreferenceForm onSearch={handleSearch} />
        </div>
        
        <div className="results-section">
          {loading && <p className="loading">Searching for the best cars...</p>}
          {error && <p className="error">{error}</p>}
          {searchResults && (
            <CarList cars={searchResults} showScore={true} title="Cars Matching Your Preferences" />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
