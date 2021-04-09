import React, { useState } from "react"
import { useRoutes } from "react-router-dom"
import routes from "./routes"
import WeatherService from "./services/fmi"
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
  const [city, setCity] = useState<City>({ fmisid: 101124, name: "Tampere" })
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startTime: tenDaysPast,
    endTime: weekFromNow,
  })
  const weatherService = new WeatherService(city, timeRange)
  const electricityService = new ElectricityPageData(timeRange)

  const handleCityChange = (newCity: City) => {
    setCity(newCity)
    weatherService.city = newCity
  }

  const handleTimeChange = (newRange: TimeRange) => {
    if (newRange.endTime < newRange.startTime) {
      // eslint-disable-next-line no-alert
      alert("End date must be after start date")
      return
    }
    setTimeRange(newRange)
    electricityService.setTimeRange(newRange)
    weatherService.timeRange = newRange
  }

  const routing = useRoutes(
    routes(
      city,
      handleCityChange,
      timeRange,
      handleTimeChange,
      weatherService,
      electricityService
    )
  )

  return <div>{routing}</div>
}
