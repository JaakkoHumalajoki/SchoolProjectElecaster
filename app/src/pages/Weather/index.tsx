import React from "react"
import WeatherForecastChart from "./WeatherForecastChart"
import CitySelection from "../../components/CitySelection"

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
   * Weather data held in App state to be shown in subcomponents
   */
  weatherData: WeatherDataPoint[]
}

/**
 * WeatherPage is responsible for showing all content for the weather tab.
 * @param props Props
 * @returns React element
 */
const WeatherPage = (props: Props): JSX.Element => {
  const { city, onCityChange, weatherData } = props

  return (
    <div>
      <CitySelection city={city} onCityChange={onCityChange} />
      <WeatherForecastChart weatherData={weatherData} />
    </div>
  )
}

export default WeatherPage
