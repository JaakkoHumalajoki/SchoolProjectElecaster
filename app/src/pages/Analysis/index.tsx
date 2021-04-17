import React, { useState, useEffect } from "react"
import ElectricityService from "../../services/fingrid"
import TimeSelection from "../../components/TimeSelection"
import CitySelection from "../../components/CitySelection"
import HistoryChart from "./HistoryChart"
import ForecastChart from "./ForecastChart"
import EnergyComparisonChart from "./EnergyComparisonChart"
import WeatherService from "../../services/fmi"
import { emptyWeatherData, emptyElectricityData } from "../../common"

export interface Props {
  city: City
  /**
   * Callback function for when user selects a new city
   * @param newCity selected City object
   */
  onCityChange: (newCity: City) => void
  /**
   * Weather data held in App state to be shown in subcomponents
   */
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
  /**
   * ElectricityPageData service from which electricity data can be fetched
   */
  electricityService: ElectricityService
}

const AnalysisPage = (props: Props): JSX.Element => {
  const {
    city,
    onCityChange,
    timeRange,
    onTimeChange,
    weatherService,
    electricityService,
  } = props
  const [electricityData, setElectricityData] = useState<ElectricityData>(
    emptyElectricityData
  )
  const [weatherData, setWeatherData] = useState<
    Pick<WeatherData, "forecast" | "history">
  >(emptyWeatherData)

  useEffect(() => {
    setElectricityData(emptyElectricityData)

    electricityService.fetch().then(() => {
      const elecData: ElectricityData = {
        history: electricityService.history,
        forecast: electricityService.forecast,
      }

      setElectricityData(elecData)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange])

  useEffect(() => {
    setWeatherData(emptyWeatherData)

    weatherService.fetch().then(() => {
      const newWeatherData: Pick<WeatherData, "forecast" | "history"> = {
        history: weatherService.history ? weatherService.history : [],
        forecast: weatherService.forecast ? weatherService.forecast : [],
      }

      newWeatherData.forecast = newWeatherData.forecast.filter(
        (dataPoint) =>
          dataPoint.time >= timeRange.startTime &&
          dataPoint.time <= timeRange.endTime
      )

      setWeatherData(newWeatherData)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, timeRange])

  return (
    <div>
      <CitySelection city={city} onCityChange={onCityChange} />
      <TimeSelection timeRange={timeRange} onTimeChange={onTimeChange} />
      <HistoryChart
        consumptionData={electricityData.history.consumption.total}
        productionData={electricityData.history.production.total}
        nuclearData={electricityData.history.production.nuclear}
        hydroData={electricityData.history.production.hydro}
        windData={electricityData.history.production.wind}
        weatherData={weatherData.history}
      />
      <EnergyComparisonChart
        consumptionHistory={electricityData.history.consumption.total}
        productionHistory={electricityData.history.production.total}
        windHistory={electricityData.history.production.wind}
        consumptionForecast={electricityData.forecast.consumption.total}
        productionForecast={electricityData.forecast.production.total}
        windForecast={electricityData.forecast.production.wind}
      />
      <ForecastChart
        consumptionForecast={electricityData.forecast.consumption.total}
        productionForecast={electricityData.forecast.production.total}
        windForecast={electricityData.forecast.production.wind}
        forecastData={weatherData.forecast}
      />
    </div>
  )
}

export default AnalysisPage
