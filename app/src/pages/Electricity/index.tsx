import React, { useEffect, useState } from "react"
import {
  ElectricityPageDataInterface,
  ElectricityPageData,
} from "../../services/queries"
import { TimeRange } from "../../common"
import TimeSelection from "../../components/TimeSelection"
import ComparisonChart from "./ComparisonChart"
import ForecastChart from "./ForecastChart"
import PieChart from "./PieChart"

interface Props {
  timeRange: TimeRange
  onTimeChange(newRange: TimeRange): void
  electricityData: ElectricityPageData
}

export default (props: Props): JSX.Element => {
  const { timeRange, onTimeChange, electricityData } = props
  const [data, setData] = useState<ElectricityPageDataInterface | null>(null)

  useEffect(() => {
    electricityData.fetch().then(() => {
      const newData: ElectricityPageDataInterface = {
        forecast: electricityData.forecast,
        history: electricityData.history,
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
