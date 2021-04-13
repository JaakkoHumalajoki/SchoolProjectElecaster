import React, { useState, useEffect } from "react"
import WeatherForecastChart from "./WeatherForecastChart"
import WeatherHistoryChart from "./WeatherHistoryChart"
import CitySelection from "../../components/CitySelection"
import TimeSelection from "../../components/TimeSelection"
import WeatherService from "../../services/fmi"
import { WeatherDataSet, emptyWeatherData } from "../../common"

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
  const [weatherData, setWeatherData] = useState<WeatherDataSet>(
    emptyWeatherData
  )

  useEffect(() => {
    setWeatherData(emptyWeatherData)

    weatherService.fetch().then(() => {
      const newWeatherData: WeatherDataSet = {
        history: weatherService.history ? weatherService.history : [],
        forecast: weatherService.forecast ? weatherService.forecast : [],
      }
      setWeatherData(newWeatherData)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, timeRange])

  return (
    <div>
      <CitySelection city={city} onCityChange={onCityChange} />
      <TimeSelection timeRange={timeRange} onTimeChange={onTimeChange} />
      <WeatherForecastChart forecastData={weatherData.forecast} />
      <WeatherHistoryChart historyData={weatherData.history} />
    </div>
  )
}

export default WeatherPage
