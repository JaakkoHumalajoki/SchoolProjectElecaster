import React, { useEffect, useState } from "react"
import {
  fetchElectricityData,
  ElectricityDataPoint,
} from "../../services/fingrid"
import { fingridVariables } from "../../services/fingrid-types"
import { TimeRange } from "../../common"
import ComparisonChart from "./ComparisonChart"
import HistoryChart from "./HistoryChart"
import PieChart from "./PieChart"

export default (): JSX.Element => {
  const [consumptionData, setConsumptionData] = useState<
    ElectricityDataPoint[]
  >([])
  const [productionData, setProductionData] = useState<ElectricityDataPoint[]>(
    []
  )
  const [nuclearData, setNuclearData] = useState<ElectricityDataPoint[]>([])
  const [hydroData, setHydroData] = useState<ElectricityDataPoint[]>([])
  const [windData, setWindData] = useState<ElectricityDataPoint[]>([])
  const [forecastConsumptionData, setForecastConsumptionData] = useState<
    ElectricityDataPoint[]
  >([])
  const [forecastProductionData, setForecastProductionData] = useState<
    ElectricityDataPoint[]
  >([])
  const [forecastWindData, setForecastWindData] = useState<
    ElectricityDataPoint[]
  >([])

  const today: Date = new Date()
  const tenDaysPast: Date = new Date()
  tenDaysPast.setDate(today.getDate() - 10)
  const weekFromNow: Date = new Date()
  weekFromNow.setDate(today.getDate() + 7)

  const pastRange: TimeRange = {
    startTime: tenDaysPast,
    endTime: today,
  }

  const futureRange: TimeRange = {
    startTime: today,
    endTime: weekFromNow,
  }
  useEffect(() => {
    const fetchData = async () => {
      const dataPromises: Promise<ElectricityDataPoint[]>[] = []

      dataPromises.push(
        fetchElectricityData(fingridVariables.consumptionTotal, pastRange)
      )
      dataPromises.push(
        fetchElectricityData(fingridVariables.productionTotal, pastRange)
      )
      dataPromises.push(
        fetchElectricityData(fingridVariables.productionNuclear, pastRange)
      )
      dataPromises.push(
        fetchElectricityData(fingridVariables.productionHydro, pastRange)
      )
      dataPromises.push(
        fetchElectricityData(fingridVariables.productionWind, pastRange)
      )
      dataPromises.push(
        fetchElectricityData(fingridVariables.consumptionForecast, futureRange)
      )
      dataPromises.push(
        fetchElectricityData(
          fingridVariables.productionForecastTotal,
          futureRange
        )
      )
      dataPromises.push(
        fetchElectricityData(
          fingridVariables.productionForecastWind,
          futureRange
        )
      )

      await Promise.all(dataPromises)

      dataPromises[0].then((data) => {
        setConsumptionData(data)
      })
      dataPromises[1].then((data) => {
        setProductionData(data)
      })
      dataPromises[2].then((data) => {
        setNuclearData(data)
      })
      dataPromises[3].then((data) => {
        setHydroData(data)
      })
      dataPromises[4].then((data) => {
        setWindData(data)
      })
      dataPromises[5].then((data) => {
        setForecastConsumptionData(data)
      })
      dataPromises[6].then((data) => {
        setForecastProductionData(data)
      })
      dataPromises[7].then((data) => {
        setForecastWindData(data)
      })
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <ComparisonChart
        consumptionData={consumptionData}
        productionData={productionData}
        nuclearData={nuclearData}
        hydroData={hydroData}
        windData={windData}
      />
      <HistoryChart
        consumptionForecast={forecastConsumptionData}
        productionForecast={forecastProductionData}
        windForecast={forecastWindData}
      />
      <PieChart
        nuclearData={nuclearData}
        hydroData={hydroData}
        windData={windData}
      />
    </div>
  )
}
