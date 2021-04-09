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
    <header>
      <div className="navbar">
        <div className="flex flex-auto">
          <Link to="/" onClick={closeNavMenu}>
            <h1 className="text-4xl font-black pb-2">Elecaster</h1>
          </Link>
        </div>
        <Navigation {...{ navMenuOpen, toggleNavMenu, closeNavMenu }} />
      </div>
    </header>
  )
}
