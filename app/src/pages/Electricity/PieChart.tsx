import React from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { ElectricityDataPoint } from "../../services/fingrid"

interface Props {
  nuclearData: ElectricityDataPoint[]
  hydroData: ElectricityDataPoint[]
  windData: ElectricityDataPoint[]
}

const calculateAvg = (data: ElectricityDataPoint[]): number => {
  if (data.length === 0) return 0
  const total: number = data.reduce((sum, point) => sum + point.value, 0)
  return Math.round(total / data.length)
}

export default (props: Props): JSX.Element => {
  const { nuclearData, hydroData, windData } = props

  const nuclearAvg = calculateAvg(nuclearData)
  const hydroAvg = calculateAvg(hydroData)
  const windAvg = calculateAvg(windData)

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Energy percentage comparison",
    },
    series: [
      {
        type: "pie",
        name: "Test",
        data: [
          {
            name: "Nuclear",
            y: nuclearAvg,
          },
          {
            name: "Hydro",
            y: hydroAvg,
          },
          {
            name: "Wind",
            y: windAvg,
          },
        ],
      },
    ],
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}
