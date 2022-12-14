import React, { useState } from "react"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import {
  calculateAverage,
  calculateMinimum,
  calculateMaximum,
  commonOptions,
} from "../../common"

/**
 * Props interface for ComparisonChart
 */
export interface Props {
  /**
   * All weather history data for currently selected city & time
   */
  historyData: WeatherDataPoint[]
}

/**
 * Displays a Highcharts graph to display weather history data
 * @param props Props
 * @returns React element
 */
const ComparisonChart = (props: Props): JSX.Element => {
  const { historyData } = props

  const [selectedRangeMin, setSelectedRangeMin] = useState(0) // 1st January, 1970
  const [selectedRangeMax, setSelectedRangeMax] = useState(10000000000000) // 266 years into future

  let tempAvg = 0
  let tempMin = 0
  let tempMax = 0
  let windMax = 0

  const selectedWeatherData = historyData.filter((dataPoint) => {
    if (
      dataPoint.time.getTime() >= selectedRangeMin &&
      dataPoint.time.getTime() <= selectedRangeMax
    ) {
      return true
    }
    return false
  })

  if (selectedWeatherData.length >= 1) {
    tempAvg = calculateAverage(
      selectedWeatherData.map((dataPoint) => dataPoint.temperature)
    )
    tempAvg = Math.round(tempAvg * 10) / 10

    tempMin = calculateMinimum(
      selectedWeatherData.map((dataPoint) => dataPoint.temperature)
    )

    tempMax = calculateMaximum(
      selectedWeatherData.map((dataPoint) => dataPoint.temperature)
    )

    windMax = calculateMaximum(
      selectedWeatherData.map((dataPoint) => {
        if (!dataPoint.windSpeed) {
          return 0
        }
        return dataPoint.windSpeed
      })
    )
  }

  const options: Highcharts.Options = {
    ...commonOptions,
    title: {
      text: "Weather history",
    },
    xAxis: {
      ...commonOptions.xAxis,
      events: {
        setExtremes(e) {
          setSelectedRangeMin(e.min)
          setSelectedRangeMax(e.max)
        },
      },
    },
    yAxis: [
      {
        title: {
          text: "Temperature",
        },
        height: "50%",
        lineWidth: 2,
        allowDecimals: false,
      },
      {
        title: {
          text: "Wind speed",
        },
        top: "55%",
        height: "20%",
        min: 0,
        offset: 0,
        lineWidth: 2,
        allowDecimals: false,
      },
      {
        title: {
          text: "Rain",
        },
        top: "80%",
        height: "20%",
        offset: 0,
        softMax: 4,
        lineWidth: 2,
        allowDecimals: false,
      },
    ],
    series: [
      {
        type: "line",
        name: "Temperature",
        showInNavigator: true,
        data: historyData.map((value) => [
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
        name: "Wind",
        yAxis: 1,
        data: historyData.map((value) => [
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
      {
        type: "column",
        name: "Precipitation",
        yAxis: 2,
        data: historyData.map((value) => [
          value.time.getTime(),
          value.precipitation1h,
        ]),
        dataGrouping: {
          enabled: true,
          units: [
            ["hour", [1]],
            ["day", [1]],
            ["week", [1]],
          ],
        },
        minPointLength: 2,
        tooltip: {
          valueSuffix: " mm",
        },
      },
    ],
  }

  return (
    <div className="card-lg ...">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div className="description-box">
        <h3>Analysis for highlighted time range</h3>
        <table className="infotable">
          <tbody>
            <tr>
              <td>Average temperature: </td>
              <td className="justify-end">{tempAvg} ??C</td>
            </tr>
            <tr>
              <td>Maximum temperature: </td>
              <td className="justify-end">{tempMax} ??C</td>
            </tr>
            <tr>
              <td>Minimum temperature:</td>
              <td className="justify-end">{tempMin} ??C</td>
            </tr>
            <tr>
              <td>Maximum wind speed:</td>
              <td className="justify-end">{windMax} m/s</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ComparisonChart
