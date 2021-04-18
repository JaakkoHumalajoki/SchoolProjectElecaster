import React from "react"
import { Link } from "react-router-dom"

export default (): JSX.Element => {
  return (
    <div className="flex flex-col self-center mx-auto my-32 max-w-lg space-y-8 text-center">
      <h3 className="m-2 text-4xl font-bold">
        Real-time data about weather and electricity
      </h3>
      <div className="flex flex-col xs:flex-row self-center space-y-4 xs:space-y-0 xs:space-x-6">
        <Link to="weather">
          <button
            type="button"
            className="btn-lg text-gray-500 bg-white hover:bg-gray-700 hover:text-white hoverAnimation"
          >
            Weather
          </button>
        </Link>
        <Link to="electricity">
          <button
            type="button"
            className="btn-lg text-white bg-gray-500 hover:bg-gray-700 hoverAnimation"
          >
            Electricity
          </button>
        </Link>
      </div>
    </div>
  )
}
