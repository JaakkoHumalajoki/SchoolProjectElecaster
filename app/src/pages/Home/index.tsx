import React from "react"
import { Link } from "react-router-dom"

export default (): JSX.Element => {
  return (
    <div className="mx-auto my-32 max-w-lg space-y-8 text-center flex flex-col">
      <h3 className="m-2 text-4xl font-bold">
        Real-time data about weather and electricity
      </h3>
      <div className="bg-white bg-opacity-60 p-2 m-4 rounded-lg max-w-xl self-center">
        <Link to="weather">
          <button
            type="button"
            className="btn-rounded-lg text-gray-500 bg-white hover:bg-gray-700 hover:text-white hoverAnimation"
          >
            Weather
          </button>
        </Link>
        <Link to="electricity">
          <button
            type="button"
            className="btn-rounded-lg text-white bg-gray-500 hover:bg-gray-700 hoverAnimation"
          >
            Electricity
          </button>
        </Link>
      </div>
    </div>
  )
}
