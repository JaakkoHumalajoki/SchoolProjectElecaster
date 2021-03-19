import React, { useState, useEffect } from "react"
import { useRoutes } from "react-router-dom"
import routes from "./routes"
import weatherService, { WeatherData, WeatherDataPoint } from "./services/fmi"
import { TimeRange } from "./common"

const today: Date = new Date()
const tenDaysPast: Date = new Date()
tenDaysPast.setDate(today.getDate() - 10)
const weekFromNow: Date = new Date()
weekFromNow.setDate(today.getDate() + 7)

export default function App(): JSX.Element {
  const [city, setCity] = useState<string>("tampere")
  const [weatherData, setWeatherData] = useState<WeatherDataPoint[]>([])
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startTime: tenDaysPast,
    endTime: weekFromNow,
  })

  useEffect(() => {
    weatherService.getWeatherData(city).then((data: WeatherData) => {
      setWeatherData(data.data)
    })
  }, [city])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCityChange = (event: any) => {
    setCity(event.target.value)
  }

  const handleTimeChange = (newRange: TimeRange) => {
    setTimeRange(newRange)
  }

  const routing = useRoutes(
    routes(city, handleCityChange, timeRange, handleTimeChange, weatherData)
  )

  return <div>{routing}</div>
}
