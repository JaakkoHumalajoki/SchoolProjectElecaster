import React from "react"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import { WeatherDataPoint } from "../../services/fmi"

/**
 * Props interface for ComparisonChart
 */
export interface Props {
  /**
   * All weather data for currently selected city
   */
  weatherData: WeatherDataPoint[]
}

/**
 * Displays a Highcharts graph to display weather data for
 * selected city
 * @param props Props
 * @returns React element
 */
const ComparisonChart = (props: Props): JSX.Element => {
  const { weatherData } = props

  const options: Highcharts.Options = {
    title: {
      text: "Weather forecast",
    },
    navigator: {
      enabled: true,
      maskFill: "rgba(0, 82, 156, 0.3)",
      series: { color: "rgba(0, 82, 156, 0.3)" },
      adaptToUpdatedData: true,
    },
    rangeSelector: {
      enabled: true,
      verticalAlign: "bottom",
      buttons: [
        {
          type: "day",
          count: 1,
          text: "1d",
          title: "View a day",
        },
        {
          type: "day",
          count: 7,
          text: "1w",
          title: "View a week",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
          title: "View a month",
        },
        {
          type: "all",
          text: "All",
          title: "View all",
        },
      ],
    },
    xAxis: {
      type: "datetime",
      crosshair: true,
    },
    yAxis: [
      {
        title: {
          text: "Temperature",
        },
        height: "75%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        title: {
          text: "Rain",
        },
        top: "80%",
        height: "20%",
        offset: 0,
        lineWidth: 2,
        softMax: 5,
      },
    ],
    tooltip: {
      shared: true,
    },
    series: [
      {
        type: "line",
        name: "Temperature",
        showInNavigator: true,
        data: weatherData.map((value) => [
          value.time.getTime(),
          value.temperature,
        ]),
        tooltip: {
          valueSuffix: " C",
        },
      },
      {
        type: "line",
        name: "Wind",
        data: weatherData.map((value) => [
          value.time.getTime(),
          value.windSpeed,
        ]),
        tooltip: {
          valueSuffix: " m/s",
        },
      },
      {
        type: "column",
        name: "Precipitation",
        yAxis: 1,
        data: weatherData.map((value) => [
          value.time.getTime(),
          value.precipitation1h,
        ]),
        tooltip: {
          valueSuffix: " mm",
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

export default ComparisonChart
