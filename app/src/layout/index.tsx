import React from "react"
import { Link, Outlet } from "react-router-dom"

export default (): JSX.Element => {
  return (
    <div>
      {/* Here would be Header */}
      <Link to="/">Home</Link>
      <Link to="weather">Weather</Link>
      <Link to="electricity">Electricity</Link>
      <Link to="analysis">Analysis</Link>
      <main>
        {/* This is the the Content */}
        <Outlet />
      </main>
      {/* Here would be Footer */}
      Footer
    </div>
  )
}
