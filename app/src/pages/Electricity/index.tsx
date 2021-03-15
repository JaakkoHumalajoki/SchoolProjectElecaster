import React, { useEffect, useState } from "react"
import fingridService, {
  ElectricityData,
  ElectricityDataPoint,
} from "../../services/fingrid"
import { variables } from "../../services/fingrid-types"
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

  useEffect(() => {
    const fetchData = async () => {
      const dataPromises: Promise<ElectricityData>[] = []

      dataPromises.push(
        fingridService.getElectricityData(
          variables.consumptionTotal,
          tenDaysPast,
          today
        )
      )
      dataPromises.push(
        fingridService.getElectricityData(
          variables.productionTotal,
          tenDaysPast,
          today
        )
      )
      dataPromises.push(
        fingridService.getElectricityData(
          variables.productionNuclear,
          tenDaysPast,
          today
        )
      )
      dataPromises.push(
        fingridService.getElectricityData(
          variables.productionHydro,
          tenDaysPast,
          today
        )
      )
      dataPromises.push(
        fingridService.getElectricityData(
          variables.productionWind,
          tenDaysPast,
          today
        )
      )
      dataPromises.push(
        fingridService.getElectricityData(
          variables.consumptionForecast,
          today,
          weekFromNow
        )
      )
      dataPromises.push(
        fingridService.getElectricityData(
          variables.productionForecastTotal,
          today,
          weekFromNow
        )
      )
      dataPromises.push(
        fingridService.getElectricityData(
          variables.productionForecastWind,
          today,
          weekFromNow
        )
      )

      await Promise.all(dataPromises)

      dataPromises[0].then((data) => {
        setConsumptionData(data.data)
      })
      dataPromises[1].then((data) => {
        setProductionData(data.data)
      })
      dataPromises[2].then((data) => {
        setNuclearData(data.data)
      })
      dataPromises[3].then((data) => {
        setHydroData(data.data)
      })
      dataPromises[4].then((data) => {
        setWindData(data.data)
      })
      dataPromises[5].then((data) => {
        setForecastConsumptionData(data.data)
      })
      dataPromises[6].then((data) => {
        setForecastProductionData(data.data)
      })
      dataPromises[7].then((data) => {
        setForecastWindData(data.data)
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
