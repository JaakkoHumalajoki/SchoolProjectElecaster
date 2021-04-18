import React, { useEffect, useState } from "react"
import ElectricityService from "../../services/fingrid"
import TimeSelection from "../../components/TimeSelection"
import ComparisonChart from "./ComparisonChart"
import ForecastChart from "./ForecastChart"
import PieChart from "./PieChart"
import { emptyElectricityData } from "../../common"

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
  electricityService: ElectricityService
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
  const [electricityData, setElectricityData] = useState<ElectricityData>(
    emptyElectricityData
  )

  useEffect(() => {
    setElectricityData(emptyElectricityData)

    electricityService.fetch().then(() => {
      const newData: ElectricityData = {
        forecast: electricityService.forecast,
        history: electricityService.history,
      }
      setElectricityData(newData)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange])

  if (electricityData === emptyElectricityData) {
    return (
      <div>
        <div className="topControls">
          <TimeSelection timeRange={timeRange} onTimeChange={onTimeChange} />
        </div>
        <div className="card-lg grid place-content-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 m-10" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="topControls">
        <TimeSelection timeRange={timeRange} onTimeChange={onTimeChange} />
      </div>
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
