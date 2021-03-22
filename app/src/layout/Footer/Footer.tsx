import React from "react"

export default (): JSX.Element => (
  <footer className="bg-gray-300 h-36 shadow-inner">
    <div className="navbar">
      © {new Date().getFullYear()} Elecaster witchcraft
    </div>
  </footer>
)
