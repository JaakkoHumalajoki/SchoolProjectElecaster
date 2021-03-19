import React from "react"
import { WeatherDataPoint } from "../../services/fmi"
import ComparisonChart from "./ComparisonChart"
import CitySelection from "../../components/CitySelection"

interface Props {
  city: string
  onCityChange(newCity: string): void
  weatherData: WeatherDataPoint[]
}

export default (props: Props): JSX.Element => {
  const { city, onCityChange, weatherData } = props

  return (
    <div>
      <CitySelection city={city} onCityChange={onCityChange} />
      <ComparisonChart weatherData={weatherData} />
    </div>
  )
}
