import React from "react"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import { commonOptions } from "../../common"

/**
 * Props interface for HistoryChart component
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
  /**
   * All history data for currently selected city
   */
  weatherData: WeatherDataPoint[]
}

/**
 * Displays a Highcharts graph to compare electricity and
 * weather history data in analysis page
 * @param props Props
 * @returns React element
 */
const HistoryChart = (props: Props): JSX.Element => {
  const {
    consumptionData,
    productionData,
    nuclearData,
    hydroData,
    windData,
    weatherData,
  } = props

  const options: Highcharts.Options = {
    ...commonOptions,
    title: {
      text: "Energy & weather history analysis",
    },
    tooltip: {
      ...commonOptions.tooltip,
      valueDecimals: 1,
    },
    yAxis: [
      {
        title: {
          text: "Electricity",
        },
        height: "45%",
        lineWidth: 2,
      },
      {
        title: {
          text: "Weather",
        },
        top: "55%",
        height: "45%",
        offset: 0,
        lineWidth: 2,
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
      {
        type: "line",
        name: "Temperature",
        showInNavigator: true,
        yAxis: 1,
        data: weatherData.map((value) => [
          value.time.getTime(),
          value.temperature,
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
          valueSuffix: " C",
        },
      },
      {
        type: "line",
        name: "Wind speed",
        showInNavigator: true,
        yAxis: 1,
        data: weatherData.map((value) => [
          value.time.getTime(),
          value.windSpeed,
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
          valueSuffix: " m/s",
        },
      },
    ],
  }

  return (
    <div className="card-lg">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <p>
        Chart for comparing historical data between electricity and weather.
      </p>
    </div>
  )
}

export default HistoryChart
