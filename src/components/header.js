import React from 'react'
import {NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className="header">
      <NavLink className="link"to="/">Home</NavLink>
      <NavLink className="link"to="/favorite">Favorites</NavLink>   
    </div>
  )
}

export default Header;
