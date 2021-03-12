import React, { useEffect, useState } from "react"
import ComparisonChart from "./ComparisonChart"
import fingridService, { ElectricityDataPoint } from "../../services/fingrid"
import { variables } from "../../services/fingrid-types"
import HistoryChart from "./HistoryChart"

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
    fingridService
      .getElectricityData(variables.consumptionTotal, tenDaysPast, today)
      .then((electricityData) => {
        setConsumptionData(electricityData.data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fingridService
      .getElectricityData(variables.productionTotal, tenDaysPast, today)
      .then((electricityData) => {
        setProductionData(electricityData.data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fingridService
      .getElectricityData(variables.productionNuclear, tenDaysPast, today)
      .then((electricityData) => {
        setNuclearData(electricityData.data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fingridService
      .getElectricityData(variables.productionHydro, tenDaysPast, today)
      .then((electricityData) => {
        setHydroData(electricityData.data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fingridService
      .getElectricityData(variables.productionWind, tenDaysPast, today)
      .then((electricityData) => {
        setWindData(electricityData.data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fingridService
      .getElectricityData(variables.consumptionForecast, today, weekFromNow)
      .then((electricityData) => {
        setForecastConsumptionData(electricityData.data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fingridService
      .getElectricityData(variables.productionForecastTotal, today, weekFromNow)
      .then((electricityData) => {
        setForecastProductionData(electricityData.data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fingridService
      .getElectricityData(variables.productionForecastWind, today, weekFromNow)
      .then((electricityData) => {
        setForecastWindData(electricityData.data)
      })
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
    </div>
  )
}
