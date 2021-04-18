import React, { useState } from "react"
import { Link } from "react-router-dom"
import Navigation from "./Navigation"

export default (): JSX.Element => {
  const [navMenuOpen, setNavMenuOpen] = useState(false)

  const toggleNavMenu = () => setNavMenuOpen(!navMenuOpen)

  const closeNavMenu = () => {
    if (navMenuOpen) setNavMenuOpen(false)
  }

  return (
    <header
      className={`border-2 bg-white fixed w-full z-20 ${
        navMenuOpen ? "bg-opacity-100" : "bg-opacity-80 "
      }`}
    >
      <div className="flex flex-col sm:flex-row max-w-6xl mx-auto items-center p-2 sm:p-4">
        <div className="flex flex-auto self-start">
          <Link to="/" onClick={closeNavMenu}>
            <span className="text-2xl sm:text-4xl font-black border-b-2 border-transparent hover:border-black hoverAnimation">
              Elecaster
            </span>
          </Link>
        </div>
        <Navigation {...{ navMenuOpen, toggleNavMenu, closeNavMenu }} />
      </div>
    </header>
  )
}
