import React, { useState, useEffect } from "react"
import { ElectricityPageData } from "../../services/queries"
import TimeSelection from "../../components/TimeSelection"
import CitySelection from "../../components/CitySelection"
import ForecastChart from "./ForecastChart"

export interface Props {
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
   * ElectricityPageData service from which electricity data can be fetched
   */
  electricityService: ElectricityPageData
  /**
   * Currently selected city in App state
   */
  city: string
  /**
   * Callback function for when user selects a new city
   * @param newCity city name as string
   */
  onCityChange(newCity: string): void
  /**
   * Weather data held in App state to be shown in subcomponents
   */
  weatherData: WeatherDataPoint[]
}

const AnalysisPage = (props: Props): JSX.Element => {
  const {
    timeRange,
    onTimeChange,
    electricityService,
    city,
    onCityChange,
    weatherData,
  } = props
  const [data, setData] = useState<ElectricityData | null>(null)

  useEffect(() => {
    electricityService.fetch().then(() => {
      const newData: ElectricityData = {
        forecast: electricityService.forecast,
        history: electricityService.history,
      }

      const now = new Date()
      newData.forecast.consumption.total = newData.forecast.consumption.total.filter(
        (dataPoint) => dataPoint.time >= now
      )
      newData.forecast.production.total = newData.forecast.production.total.filter(
        (dataPoint) => dataPoint.time >= now
      )
      newData.forecast.production.wind = newData.forecast.production.wind.filter(
        (dataPoint) => dataPoint.time >= now
      )

      setData(newData)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange])

  if (data === null) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <CitySelection city={city} onCityChange={onCityChange} />
      <TimeSelection timeRange={timeRange} onTimeChange={onTimeChange} />
      <ForecastChart
        consumptionForecast={data.forecast.consumption.total}
        productionForecast={data.forecast.production.total}
        windForecast={data.forecast.production.wind}
        weatherData={weatherData}
      />
    </div>
  )
}

export default AnalysisPage
