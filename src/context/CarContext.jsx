import React, { createContext, useContext, useState } from 'react'

const CarContext = createContext()

export const CarProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState(null)
  const [filters, setFilters] = useState({})

  return (
    <CarContext.Provider value={{ selectedCar, setSelectedCar, filters, setFilters }}>
      {children}
    </CarContext.Provider>
  )
}

export const useCarContext = () => {
  return useContext(CarContext)
}
