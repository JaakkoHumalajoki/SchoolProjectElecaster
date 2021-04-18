import React from "react"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import { commonOptions } from "../../common"

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
  /**
   * All weather data for currently selected city
   */
  forecastData: WeatherDataPoint[]
}

/**
 * Displays a Highcharts graph to compare electricity and
 * weather data in analysis page
 * @param props Props
 * @returns React element
 */
const ForecastChart = (props: Props): JSX.Element => {
  const {
    consumptionForecast,
    productionForecast,
    windForecast,
    forecastData: weatherData,
  } = props

  const options: Highcharts.Options = {
    ...commonOptions,
    title: {
      text: "Energy & weather forecast analysis",
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
        name: "Total Production",
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
        name: "Wind Energy",
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
        This data is the electricity & weather forecast predictions, which can
        show values up to 9 days into the future.
      </p>
      <p>
        While looking at past dates, the values are the predictions as they were
        before correct measurements were done.
      </p>
      <p>No data exists for old weather forecasts.</p>
    </div>
  )
}

export default ForecastChart
