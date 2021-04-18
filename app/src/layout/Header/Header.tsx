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
    <header className="border mb-3 bg-white bg-opacity-70">
      <div className="navbar">
        <div className="flex flex-auto">
          <Link to="/" onClick={closeNavMenu}>
            <span className="text-4xl font-black border-b-2 border-transparent hover:border-black hoverAnimation">
              Elecaster
            </span>
          </Link>
        </div>
        <Navigation {...{ navMenuOpen, toggleNavMenu, closeNavMenu }} />
      </div>
    </header>
  )
}
