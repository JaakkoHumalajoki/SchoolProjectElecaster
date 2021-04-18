import React, { useState, useEffect } from "react"
import WeatherForecastChart from "./WeatherForecastChart"
import WeatherHistoryChart from "./WeatherHistoryChart"
import CitySelection from "../../components/CitySelection"
import TimeSelection from "../../components/TimeSelection"
import WeatherService from "../../services/fmi"
import { emptyWeatherData } from "../../common"

/**
 * Props interface for WeatherPage component
 */
export interface Props {
  /**
   * Currently selected city in App state
   */
  city: City
  /**
   * Callback function for when user selects a new city
   * @param newCity selected City object
   */
  onCityChange(newCity: City): void
  /**
   * Currently selected TimeRange in App state
   */
  timeRange: TimeRange
  /**
   * Callback function for when user changes TimeRange
   * @param newRange changed TimeRange
   */
  onTimeChange(newRange: TimeRange): void
  /**
   * WeatherService from which weather-related data can be fetched
   */
  weatherService: WeatherService
}

/**
 * WeatherPage is responsible for showing all content for the weather tab.
 * @param props Props
 * @returns React element
 */
const WeatherPage = (props: Props): JSX.Element => {
  const { city, onCityChange, timeRange, onTimeChange, weatherService } = props
  const [weatherData, setWeatherData] = useState<
    Pick<WeatherData, "forecast" | "history">
  >(emptyWeatherData)

  useEffect(() => {
    setWeatherData(emptyWeatherData)

    weatherService.fetch().then(() => {
      const newWeatherData: Pick<WeatherData, "forecast" | "history"> = {
        history: weatherService.history ? weatherService.history : [],
        forecast: weatherService.forecast ? weatherService.forecast : [],
      }
      setWeatherData(newWeatherData)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, timeRange])

  return (
    <div>
      <div className="topControls">
        <CitySelection city={city} onCityChange={onCityChange} />
        <TimeSelection timeRange={timeRange} onTimeChange={onTimeChange} />
      </div>
      <WeatherHistoryChart historyData={weatherData.history} />
      <WeatherForecastChart forecastData={weatherData.forecast} />
    </div>
  )
}

export default WeatherPage
