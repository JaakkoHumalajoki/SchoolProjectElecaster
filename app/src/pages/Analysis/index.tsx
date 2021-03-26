import React, { useState, useEffect } from "react"
import { WeatherDataPoint } from "../../services/fmi"
import { TimeRange } from "../../common"
import {
  ElectricityPageDataInterface,
  ElectricityPageData,
} from "../../services/queries"
import TimeSelection from "../../components/TimeSelection"
import CitySelection from "../../components/CitySelection"
import ComparisonChart from "../Electricity/ComparisonChart"
import WeatherChart from "../Weather/ComparisonChart"

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
  const { timeRange, onTimeChange, electricityService, city, onCityChange, weatherData } = props
  const [data, setData] = useState<ElectricityPageDataInterface | null>(null)

  useEffect(() => {
    electricityService.fetch().then(() => {
      const newData: ElectricityPageDataInterface = {
        forecast: electricityService.forecast,
        history: electricityService.history,
      }
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
      <ComparisonChart
        consumptionData={data.history.consumption.total}
        productionData={data.history.production.total}
        nuclearData={data.history.production.nuclear}
        hydroData={data.history.production.hydro}
        windData={data.history.production.wind}
      />
      <WeatherChart weatherData={weatherData} />
    </div>
  )
}

export default AnalysisPage;