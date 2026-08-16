import React from 'react'
import logo from "../assets/Logo.png"

const Logo = () => {
  console.log(logo)

  return (
    <img
      src={logo}
      alt="Logo"
      className="w-32 h-auto"
    />
  )
}

export default Logo