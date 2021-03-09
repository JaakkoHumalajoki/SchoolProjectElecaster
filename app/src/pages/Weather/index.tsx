import React, { useState, useEffect } from "react"
import ComparisonChart from "./ComparisonChart"
import weatherService, {
  WeatherData,
  WeatherDataPoint,
} from "../../services/fmi"

export default (): JSX.Element => {
  const [data, setData] = useState<WeatherDataPoint[]>([])
  useEffect(() => {
    weatherService
      .getWeatherData("Tampere")
      .then((weatherData: WeatherData) => {
        setData(weatherData.data)
      })
  }, [])

  return (
    <div>
      <h1>Electricity</h1>
      <ComparisonChart weatherData={data} />
    </div>
  )
}
