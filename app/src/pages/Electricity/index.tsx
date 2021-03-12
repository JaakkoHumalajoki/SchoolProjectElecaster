import React, { useEffect, useState } from "react"
import ComparisonChart from "./ComparisonChart"
import fingridService, { ElectricityDataPoint } from "../../services/fingrid"
import { variables } from "../../services/fingrid-types"

export default (): JSX.Element => {
  const [nuclearData, setNuclearData] = useState<ElectricityDataPoint[]>([])
  const [hydroData, setHydroData] = useState<ElectricityDataPoint[]>([])
  const [windData, setWindData] = useState<ElectricityDataPoint[]>([])
  const [consumptionData, setConsumptionData] = useState<
    ElectricityDataPoint[]
  >([])
  // const [forecastWindData, setForecastWindData] = useState<
  //   ElectricityDataPoint[]
  // >([])

  const today: Date = new Date()
  const tenDaysPast: Date = new Date()
  tenDaysPast.setDate(today.getDate() - 10)

  useEffect(() => {
    fingridService
      .getElectricityData(variables.consumptionForecast, tenDaysPast, today)
      .then((electricityData) => {
        setConsumptionData(electricityData.data)
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

  return (
    <div>
      <ComparisonChart
        consumptionData={consumptionData}
        nuclearData={nuclearData}
        hydroData={hydroData}
        windData={windData}
      />
    </div>
  )
}
