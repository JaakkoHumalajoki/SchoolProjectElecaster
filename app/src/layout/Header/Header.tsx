import React from "react"
import { Link } from "react-router-dom"
import Navigation from "./Navigation"

export default (): JSX.Element => (
  <header>
    <div className="navbar">
      <Link to="/">
        <h1 className="text-4xl font-black">Elecaster</h1>
      </Link>
      <Navigation />
    </div>
  </header>
)
