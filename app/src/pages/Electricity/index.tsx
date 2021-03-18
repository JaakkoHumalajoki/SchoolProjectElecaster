import React, { useEffect, useState } from "react"
import {
  ElectricityPageDataInterface,
  ElectricityPageData,
} from "../../services/queries"
import { TimeRange } from "../../common"
import ComparisonChart from "./ComparisonChart"
import HistoryChart from "./HistoryChart"
import PieChart from "./PieChart"

const today: Date = new Date()
const tenDaysPast: Date = new Date()
tenDaysPast.setDate(today.getDate() - 10)
const weekFromNow: Date = new Date()
weekFromNow.setDate(today.getDate() + 7)

const emptyData: ElectricityPageDataInterface = {} as ElectricityPageDataInterface

export default (): JSX.Element => {
  const [data, setData] = useState<ElectricityPageDataInterface>(emptyData)
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startTime: tenDaysPast,
    endTime: weekFromNow,
  })

  useEffect(() => {
    const dataSource = new ElectricityPageData(timeRange)
    dataSource.fetch().then(() => {
      const newData: ElectricityPageDataInterface = {
        forecast: dataSource.forecast,
        history: dataSource.history,
      }
      setData(newData)
    })
  }, [timeRange])

  const startTimeString = timeRange.startTime.toISOString().slice(0, 10)
  const endTimeString = timeRange.endTime.toISOString().slice(0, 10)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStartTimeChange = (event: any) => {
    if (event.target.valueAsDate === null) {
      setTimeRange({ ...timeRange, startTime: today })
      return
    }
    setTimeRange({ ...timeRange, startTime: event.target.valueAsDate })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEndTimeChange = (event: any) => {
    if (event.target.valueAsDate === null) {
      setTimeRange({ ...timeRange, endTime: today })
      return
    }
    setTimeRange({ ...timeRange, endTime: event.target.valueAsDate })
  }

  if (data === emptyData) {
    return <div>Loading...</div>
  }

  return (
    <div>
      Search range start:{" "}
      <input
        type="date"
        defaultValue={startTimeString}
        onChange={handleStartTimeChange}
      />
      End:{" "}
      <input
        type="date"
        defaultValue={endTimeString}
        onChange={handleEndTimeChange}
      />
      <ComparisonChart
        consumptionData={data.history.consumption.total}
        productionData={data.history.production.total}
        nuclearData={data.history.production.nuclear}
        hydroData={data.history.production.hydro}
        windData={data.history.production.wind}
      />
      <HistoryChart
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
