import React from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

/**
 * Props interface for PieChart component
 */
export interface Props {
  /**
   * Total production data for all of Finland
   */
  productionData: ElectricityDataPoint[]
  /**
   * Total nuclear production data for all of Finland
   */
  nuclearData: ElectricityDataPoint[]
  /**
   * Total hydro production data for all of Finland
   */
  hydroData: ElectricityDataPoint[]
  /**
   * Total wind production data for all of Finland
   */
  windData: ElectricityDataPoint[]
}

const calculateAvg = (data: ElectricityDataPoint[]): number => {
  if (data.length === 0) return 0
  const total: number = data.reduce((sum, point) => sum + point.value, 0)
  return Math.round(total / data.length)
}

/**
 * Displays a Highcharts pie graph to compare energy percentages
 * by type as an average from all given data.
 * @param props Props
 * @returns React element
 */
const PieChart = (props: Props): JSX.Element => {
  const { productionData, nuclearData, hydroData, windData } = props

  const productionAvg = calculateAvg(productionData)
  const nuclearAvg = calculateAvg(nuclearData)
  const hydroAvg = calculateAvg(hydroData)
  const windAvg = calculateAvg(windData)
  const othersAvg = productionAvg - nuclearAvg - hydroAvg - windAvg

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Average energy production by type",
    },
    tooltip: {
      headerFormat: "<b>{point.key}</b><br />",
      pointFormat:
        "Average: <b>{point.y} MW</b><br />{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    series: [
      {
        type: "pie",
        name: "Percentage",
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
          {
            name: "Other",
            sliced: true,
            y: othersAvg,
          },
        ],
      },
    ],
  }

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ className: "chartContainer" }}
      />
    </div>
  )
}

export default PieChart
