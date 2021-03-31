import React, { useEffect, useState } from "react"
import { ElectricityPageData } from "../../services/queries"
import TimeSelection from "../../components/TimeSelection"
import ComparisonChart from "./ComparisonChart"
import ForecastChart from "./ForecastChart"
import PieChart from "./PieChart"

/**
 * Props interface for ElectricityPage component
 */
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
}

/**
 * ElectricityPage component is responsible for displaying all the content
 * shown on Electricity page. Holds electricity data in state and updates it
 * whenever timeRange changes.
 * @param props Props
 * @returns React element
 */
const ElectricityPage = (props: Props): JSX.Element => {
  const { timeRange, onTimeChange, electricityService } = props
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
      <TimeSelection timeRange={timeRange} onTimeChange={onTimeChange} />
      <ComparisonChart
        consumptionData={data.history.consumption.total}
        productionData={data.history.production.total}
        nuclearData={data.history.production.nuclear}
        hydroData={data.history.production.hydro}
        windData={data.history.production.wind}
      />
      <ForecastChart
        consumptionForecast={data.forecast.consumption.total}
        productionForecast={data.forecast.production.total}
        windForecast={data.forecast.production.wind}
      />
      <PieChart
        nuclearData={data.history.production.nuclear}
        hydroData={data.history.production.hydro}
        windData={data.history.production.wind}
      />
    </div>
  )
}

export default ElectricityPage
