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
  const [
    electricityData,
    setElectricityData,
  ] = useState<ElectricityData | null>(null)

  useEffect(() => {
    electricityService.fetch().then(() => {
      const newData: ElectricityData = {
        forecast: electricityService.forecast,
        history: electricityService.history,
      }
      setElectricityData(newData)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange])

  if (!electricityData) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <TimeSelection timeRange={timeRange} onTimeChange={onTimeChange} />
      <ComparisonChart
        consumptionData={electricityData.history.consumption.total}
        productionData={electricityData.history.production.total}
        nuclearData={electricityData.history.production.nuclear}
        hydroData={electricityData.history.production.hydro}
        windData={electricityData.history.production.wind}
      />
      <ForecastChart
        consumptionForecast={electricityData.forecast.consumption.total}
        productionForecast={electricityData.forecast.production.total}
        windForecast={electricityData.forecast.production.wind}
      />
      <PieChart
        productionData={electricityData.history.production.total}
        nuclearData={electricityData.history.production.nuclear}
        hydroData={electricityData.history.production.hydro}
        windData={electricityData.history.production.wind}
      />
    </div>
  )
}

export default ElectricityPage
