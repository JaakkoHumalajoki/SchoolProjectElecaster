import React, { useState, useEffect } from "react"
import { useRoutes } from "react-router-dom"
import routes from "./routes"
import weatherService, { WeatherData, WeatherDataPoint } from "./services/fmi"

export default function App(): JSX.Element {
  const [city, setCity] = useState<string>("tampere")
  const [weatherData, setWeatherData] = useState<WeatherDataPoint[]>([])

  useEffect(() => {
    weatherService.getWeatherData(city).then((data: WeatherData) => {
      setWeatherData(data.data)
    })
  }, [city])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCityChange = (event: any) => {
    setCity(event.target.value)
  }

  const routing = useRoutes(routes(city, handleCityChange, weatherData))

  return <div>{routing}</div>
}
