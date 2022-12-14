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
    ...commonOptions,
    title: {
      text: "Energy production & consumption forecast",
    },
    xAxis: {
      ...commonOptions.xAxis,
      plotLines: [
        {
          value: new Date().getTime(),
          color: "#c3c3c3",
          width: 2,
          id: "today",
          label: {
            text: "Current time",
            style: {
              color: "#555",
            },
            rotation: 0,
            align: "left",
          },
        },
      ],
      plotBands: [
        {
          color: "#f8f8f8",
          from: 0,
          to: new Date().getTime(),
        },
      ],
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
      <div className="description-box">
        <p>
          This data is the electricity forecast predictions, which can show
          values up to 5 days into the future.
        </p>
        <p>
          While looking at past dates, the values are the predictions as they
          were before correct measurements were done.
        </p>
      </div>
    </div>
  )
}

export default ForecastChart
