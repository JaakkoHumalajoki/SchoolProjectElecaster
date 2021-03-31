import React, { useState } from "react"
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

  const [selectedRangeMin, setSelectedRangeMin] = useState(0) // 1st January, 1970
  const [selectedRangeMax, setSelectedRangeMax] = useState(10000000000000) // 266 years into future

  let tempAvg = 0
  let tempMin = 0
  let tempMax = 0
  let windMax = 0

  const selectedWeatherData = weatherData.filter((dataPoint) => {
    if (
      dataPoint.time.getTime() >= selectedRangeMin &&
      dataPoint.time.getTime() <= selectedRangeMax
    ) {
      return true
    }
    return false
  })

  if (selectedWeatherData.length >= 1) {
    const tempSum = selectedWeatherData.reduce(
      (sum, dataPoint) => sum + dataPoint.temperature,
      0
    )
    tempAvg = Math.round((tempSum / selectedWeatherData.length) * 10) / 10
    tempMin = selectedWeatherData.reduce((min, dataPoint) => {
      return dataPoint.temperature < min ? dataPoint.temperature : min
    }, selectedWeatherData[0].temperature)
    tempMax = selectedWeatherData.reduce((max, dataPoint) => {
      return dataPoint.temperature > max ? dataPoint.temperature : max
    }, selectedWeatherData[0].temperature)
    windMax = selectedWeatherData.reduce((max, dataPoint) => {
      if (!dataPoint.windSpeed) {
        return max
      }
      return dataPoint.windSpeed > max ? dataPoint.windSpeed : max
    }, 0)
  }

  const options: Highcharts.Options = {
    title: {
      text: "10 day weather forecast",
    },
    chart: {
      height: "500px",
    },
    navigator: {
      enabled: true,
      maskFill: "rgba(0, 82, 156, 0.3)",
      series: { color: "rgba(0, 82, 156, 0.3)" },
      adaptToUpdatedData: true,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      type: "datetime",
      crosshair: true,
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
      },
      {
        title: {
          text: "Wind speed",
        },
        top: "55%",
        height: "20%",
        offset: 0,
        lineWidth: 2,
      },
      {
        title: {
          text: "Rain",
        },
        top: "80%",
        height: "20%",
        offset: 0,
        softMax: 10,
        lineWidth: 2,
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
        yAxis: 1,
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
        yAxis: 2,
        data: weatherData.map((value) => [
          value.time.getTime(),
          value.precipitation1h,
        ]),
        dataGrouping: {
          approximation: (valueArray: number[]) => {
            const total = valueArray.reduce(
              (sum: number, value: number) => sum + value,
              0
            )
            return Math.round(total)
          },
          enabled: true,
          forced: true,
          units: [["day", [1]]],
          smoothed: true,
        },
        pointWidth: 30,
        minPointLength: 2,
        tooltip: {
          valueSuffix: " mm",
        },
      },
    ],
  }

  return (
    <div className="chartContainer">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <br />
      <p>Average temperature: {tempAvg} °C</p>
      <p>maximum temperature: {tempMax} °C</p>
      <p>Minimum temperature: {tempMin} °C</p>
      <br />
      <p>Maximum wind speed: {windMax} m/s</p>
    </div>
  )
}

export default ComparisonChart
