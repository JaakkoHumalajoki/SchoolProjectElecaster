import React from "react"
import { WeatherDataPoint } from "../../services/fmi"
import ComparisonChart from "./ComparisonChart"
import CitySelection from "../../components/CitySelection"

interface Props {
  city: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCityChange(event: any): void
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
