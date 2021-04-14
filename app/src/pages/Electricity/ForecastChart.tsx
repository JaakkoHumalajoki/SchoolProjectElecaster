import React from "react"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"

/**
 * Props interface for ForecastChart component
 */
export interface Props {
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
 * Displays a Highcharts graph comparing the forecast data
 * between production, consumption and wind energy production.
 * @param props Props
 * @returns React element
 */
const ForecastChart = (props: Props): JSX.Element => {
  const { consumptionForecast, productionForecast, windForecast } = props

  const options: Highcharts.Options = {
    title: {
      text: "Energy production & consumption forecast",
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
    tooltip: {
      valueDecimals: 0,
      shared: true,
    },
    series: [
      {
        type: "line",
        name: "Total Consumption",
        showInNavigator: true,
        data: consumptionForecast.map((point) => [
          point.time.getTime(),
          point.value,
        ]),
        tooltip: {
          valueSuffix: " MW",
        },
      },
      {
        type: "line",
        name: "Total Production",
        showInNavigator: true,
        data: productionForecast.map((point) => [
          point.time.getTime(),
          point.value,
        ]),
        tooltip: {
          valueSuffix: " MW",
        },
      },
      {
        type: "line",
        name: "Wind Energy",
        yAxis: 1,
        showInNavigator: true,
        data: windForecast.map((point) => [point.time.getTime(), point.value]),
        tooltip: {
          valueSuffix: " MW",
        },
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

export default ForecastChart
