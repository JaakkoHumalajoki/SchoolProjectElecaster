import React from "react"
import Navigation from "./Navigation"

export default (): JSX.Element => (
  <header>
    <div className="navbar">
      <h1 className="text-4xl font-black">Elecaster</h1>
      <Navigation />
    </div>
  </header>
)
