import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">CarDekho</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cars">All Cars</Link>
      </div>
    </nav>
  )
}

export default Navbar
