import React, { useState, useEffect } from "react"
import weatherService, {
  WeatherData,
  WeatherDataPoint,
} from "../../services/fmi"
import ComparisonChart from "./ComparisonChart"
import CitySelection from "../../components/CitySelection"

interface Props {
  city: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCityChange(event: any): void
}

export default (props: Props): JSX.Element => {
  const { city, onCityChange } = props
  const [data, setData] = useState<WeatherDataPoint[]>([])

  useEffect(() => {
    weatherService.getWeatherData(city).then((weatherData: WeatherData) => {
      setData(weatherData.data)
    })
  }, [city])

  return (
    <div>
      <CitySelection city={city} onCityChange={onCityChange} />
      <ComparisonChart weatherData={data} />
    </div>
  )
}
