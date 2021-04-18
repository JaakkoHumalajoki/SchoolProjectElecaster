import React from "react"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import { commonOptions } from "../../common"
/**
 * Props interface for ComparisonChart component
 */
export interface Props {
  /**
   * Total consumption data for all of Finland
   */
  consumptionData: ElectricityDataPoint[]
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

/**
 * Displays a Highcharts graph to compare energy consumption and
 * production history statistics
 * @param props Props
 * @returns React element
 */
const ComparisonChart = (props: Props): JSX.Element => {
  const {
    consumptionData,
    productionData,
    nuclearData,
    hydroData,
    windData,
  } = props

  const options: Highcharts.Options = {
    ...commonOptions,
    title: {
      text: "Energy production & consumption history",
    },
    tooltip: {
      ...commonOptions.tooltip,
      valueDecimals: 0,
    },
    yAxis: [
      {
        title: {
          text: "Total / MW",
        },
        height: "45%",
        offset: 0,
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        title: {
          text: "Individual / MW",
        },
        height: "45%",
        top: "55%",
        offset: 0,
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
    ],
    series: [
      {
        type: "line",
        name: "Total Consumption",
        showInNavigator: true,
        data: consumptionData.map((point) => [
          point.time.getTime(),
          point.value,
        ]),
        dataGrouping: {
          enabled: true,
          units: [
            ["hour", [1]],
            ["day", [1]],
            ["week", [1]],
          ],
        },
        tooltip: {
          valueSuffix: " MW",
        },
      },
      {
        type: "line",
        name: "Total Production",
        showInNavigator: true,
        data: productionData.map((point) => [
          point.time.getTime(),
          point.value,
        ]),
        dataGrouping: {
          enabled: true,
          units: [
            ["hour", [1]],
            ["day", [1]],
            ["week", [1]],
          ],
        },
        tooltip: {
          valueSuffix: " MW",
        },
      },
      {
        type: "line",
        name: "Nuclear Energy",
        yAxis: 1,
        showInNavigator: true,
        data: nuclearData.map((point) => [point.time.getTime(), point.value]),
        dataGrouping: {
          enabled: true,
          units: [
            ["hour", [1]],
            ["day", [1]],
            ["week", [1]],
          ],
        },
        tooltip: {
          valueSuffix: " MW",
        },
      },
      {
        type: "line",
        name: "Hydro Energy",
        yAxis: 1,
        showInNavigator: true,
        data: hydroData.map((point) => [point.time.getTime(), point.value]),
        dataGrouping: {
          enabled: true,
          units: [
            ["hour", [1]],
            ["day", [1]],
            ["week", [1]],
          ],
        },
        tooltip: {
          valueSuffix: " MW",
        },
      },
      {
        type: "line",
        name: "Wind Energy",
        yAxis: 1,
        showInNavigator: true,
        data: windData.map((point) => [point.time.getTime(), point.value]),
        dataGrouping: {
          enabled: true,
          units: [
            ["hour", [1]],
            ["day", [1]],
            ["week", [1]],
          ],
        },
        tooltip: {
          valueSuffix: " MW",
        },
      },
    ],
  }

  return (
    <div className="card-lg">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div>
        <p>
          Total electricity production and consumption and then in detail by
          nuclear, wind and hydro. The total data also includes all other
          electricity production sources in Finland (eg coal, gas).
        </p>
        <p>The total consumption data also includes imported electricity</p>
      </div>
    </div>
  )
}

export default ComparisonChart
