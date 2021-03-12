import React from "react"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import { ElectricityDataPoint } from "../../services/fingrid"

interface Props {
  consumptionData: ElectricityDataPoint[]
  productionData: ElectricityDataPoint[]
  nuclearData: ElectricityDataPoint[]
  hydroData: ElectricityDataPoint[]
  windData: ElectricityDataPoint[]
}

export default (props: Props): JSX.Element => {
  const {
    consumptionData,
    productionData,
    nuclearData,
    hydroData,
    windData,
  } = props

  const options: Highcharts.Options = {
    title: {
      text: "Energy comparison",
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
          text: "Electricity MW",
        },
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
    ],
    tooltip: {
      shared: false,
    },
    series: [
      {
        type: "line",
        name: "Total Consumption",
        showInNavigator: true,
        data: consumptionData.map((point) => [
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
        data: productionData.map((point) => [
          point.time.getTime(),
          point.value,
        ]),
        tooltip: {
          valueSuffix: " MW",
        },
      },
      {
        type: "line",
        name: "Nuclear Energy",
        showInNavigator: true,
        data: nuclearData.map((point) => [point.time.getTime(), point.value]),
        tooltip: {
          valueSuffix: " MW",
        },
      },
      {
        type: "line",
        name: "Hydro Energy",
        showInNavigator: true,
        data: hydroData.map((point) => [point.time.getTime(), point.value]),
        tooltip: {
          valueSuffix: " MW",
        },
      },
      {
        type: "line",
        name: "Wind Energy",
        showInNavigator: true,
        data: windData.map((point) => [point.time.getTime(), point.value]),
        tooltip: {
          valueSuffix: " MW",
        },
      },
    ],
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}
