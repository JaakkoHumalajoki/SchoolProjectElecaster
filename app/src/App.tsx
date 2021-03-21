import React, { useState, useEffect } from "react"
import { useRoutes } from "react-router-dom"
import routes from "./routes"
import weatherService, { WeatherData, WeatherDataPoint } from "./services/fmi"
import { TimeRange } from "./common"
import { ElectricityPageData } from "./services/queries"

const today: Date = new Date()
const tenDaysPast: Date = new Date()
tenDaysPast.setDate(today.getDate() - 10)
const weekFromNow: Date = new Date()
weekFromNow.setDate(today.getDate() + 7)

/**
 * App is the main component of the application, handling the shared state
 * and data for all pages of the website.
 * @returns React element
 */
export default function App(): JSX.Element {
  const [city, setCity] = useState<string>("tampere")
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startTime: tenDaysPast,
    endTime: weekFromNow,
  })
  const [weatherData, setWeatherData] = useState<WeatherDataPoint[]>([])
  const electricityService = new ElectricityPageData(timeRange)

  useEffect(() => {
    weatherService.getWeatherData(city).then((data: WeatherData) => {
      setWeatherData(data.data)
    })
  }, [city])

  const handleCityChange = (newCity: string) => {
    setCity(newCity)
  }

  const handleTimeChange = (newRange: TimeRange) => {
    if (newRange.endTime < newRange.startTime) {
      // eslint-disable-next-line no-alert
      alert("End date must be after start date")
      return
    }
    setTimeRange(newRange)
    electricityService.setTimeRange(newRange)
  }

  const routing = useRoutes(
    routes(
      city,
      handleCityChange,
      timeRange,
      handleTimeChange,
      weatherData,
      electricityService
    )
  )

  return <div>{routing}</div>
}
