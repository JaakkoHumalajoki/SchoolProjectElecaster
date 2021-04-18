import React from "react"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
/**
 * Props interface for ComparisonChart component
 */
export interface Props {
  /**
   * Total consumption data for all of Finland
   */
  consumptionHistory: ElectricityDataPoint[]
  /**
   * Total production data for all of Finland
   */
  productionHistory: ElectricityDataPoint[]
  /**
   * Total wind production data for all of Finland
   */
  windHistory: ElectricityDataPoint[]
  /**
   * Forecast data for total consumption in Finland
   */
  consumptionForecast: ElectricityDataPoint[]
  /**
   * Forecast data for total production in Finland
   */
  productionForecast: ElectricityDataPoint[]
  /**
   * Forecast data for wind energy production in Finland
   */
  windForecast: ElectricityDataPoint[]
}

/**
 * Displays a Highcharts graph to compare energy forecast
 * to the actual energy history values
 * @param props Props
 * @returns React element
 */
const EnergyComparisonChart = (props: Props): JSX.Element => {
  const {
    consumptionHistory,
    productionHistory,
    windHistory,
    consumptionForecast,
    productionForecast,
    windForecast,
  } = props

  const options: Highcharts.Options = {
    title: {
      text: "Energy history & forecast comparison",
    },
    chart: {
      height: "600px",
    },
    time: {
      useUTC: false,
    },
    navigator: {
      enabled: true,
      maskFill: "rgba(0, 82, 156, 0.3)",
      series: { color: "rgba(0, 82, 156, 0.3)" },
      adaptToUpdatedData: true,
    },
    xAxis: {
      type: "datetime",
      crosshair: true,
    },
    yAxis: [
      {
        title: {
          text: "History",
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
          text: "Forecast",
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
    tooltip: {
      valueDecimals: 0,
      shared: true,
    },
    series: [
      {
        type: "line",
        name: "Consumption history",
        showInNavigator: true,
        data: consumptionHistory.map((point) => [
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
        name: "Production history",
        showInNavigator: true,
        data: productionHistory.map((point) => [
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
        name: "Wind history",
        showInNavigator: true,
        data: windHistory.map((point) => [point.time.getTime(), point.value]),
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
        name: "Consumption forecast",
        yAxis: 1,
        showInNavigator: true,
        data: consumptionForecast.map((point) => [
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
        name: "Production forecast",
        yAxis: 1,
        showInNavigator: true,
        data: productionForecast.map((point) => [
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
        name: "Wind forecast",
        yAxis: 1,
        showInNavigator: true,
        data: windForecast.map((point) => [point.time.getTime(), point.value]),
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
      <p>
        Chart for comparing the difference between electricity forecast
        predictions and actual measurement data.
      </p>
    </div>
  )
}

export default EnergyComparisonChart
