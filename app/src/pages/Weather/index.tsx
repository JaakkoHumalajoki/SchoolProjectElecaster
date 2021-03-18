import React, { useState, useEffect } from "react"
import ComparisonChart from "./ComparisonChart"
import weatherService, {
  WeatherData,
  WeatherDataPoint,
} from "../../services/fmi"

export default (): JSX.Element => {
  const [data, setData] = useState<WeatherDataPoint[]>([])
  const [city, setCity] = useState<string>("Tampere")

  useEffect(() => {
    weatherService.getWeatherData(city).then((weatherData: WeatherData) => {
      setData(weatherData.data)
    })
  }, [city])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCityChange = (event: any) => {
    setCity(event.target.value)
  }

  return (
    <div>
      <select name="city" onChange={handleCityChange}>
        <option value="tampere">Tampere</option>
        <option value="helsinki">Helsinki</option>
        <option value="jyväskylä">Jyväskylä</option>
      </select>
      <ComparisonChart weatherData={data} />
    </div>
  )
}
