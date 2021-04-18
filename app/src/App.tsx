import React, { useState, useEffect, useRef } from "react"

// eslint-disable-next-line
// @ts-ignore
import CLOUDS2 from "vanta/dist/vanta.clouds2.min"
import * as THREE from "three"

import Highcharts from "highcharts"
import HighchartsStock from "highcharts/highstock"
import HighchartsExporting from "highcharts/modules/exporting"

import { useRoutes } from "react-router-dom"
import routes from "./routes"
import WeatherService from "./services/fmi"
import ElectricityService from "./services/fingrid"

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts)
}
if (typeof HighchartsStock === "object") {
  HighchartsExporting(HighchartsStock)
}

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
  const [vantaEffect, setVantaEffect] = useState<any>(0)
  const vantaRef = useRef(null)

  const weatherService = new WeatherService(city, timeRange)
  const electricityService = new ElectricityService(timeRange)

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

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS2({
          el: vantaRef.current,
          scale: 1.0,
          skyColor: 0x6dc5fc,
          cloudColor: 0x8197c0,
          forceAnimate: true,
          speed: 0.5,
          texturePath: "./noise.png",
          THREE,
        })
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

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

  return <div ref={vantaRef}>{routing}</div>
}
