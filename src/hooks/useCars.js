import { useState, useEffect } from 'react'
import { carService } from '../services/api'

export const useCars = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCars = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await carService.getAllCars()
      setCars(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

  return { cars, loading, error, refetch: fetchCars }
}
