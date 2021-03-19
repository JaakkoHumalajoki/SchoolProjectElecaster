import React from "react"
import Layout from "./layout"
import Analysis from "./pages/Analysis"
import Electricity from "./pages/Electricity"
import Home from "./pages/Home"
import Weather from "./pages/Weather"
import { WeatherDataPoint } from "./services/fmi"
import { TimeRange } from "./common"
import { ElectricityPageData } from "./services/queries"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const routes = (
  city: string,
  onCityChange: (newCity: string) => void,
  timeRange: TimeRange,
  onTimeChange: (newRange: TimeRange) => void,
  weatherData: WeatherDataPoint[],
  electricityData: ElectricityPageData
) => [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "weather",
        element: (
          <Weather
            city={city}
            onCityChange={onCityChange}
            weatherData={weatherData}
          />
        ),
      },
      {
        path: "electricity",
        element: (
          <Electricity
            timeRange={timeRange}
            onTimeChange={onTimeChange}
            electricityData={electricityData}
          />
        ),
      },
      {
        path: "analysis",
        element: <Analysis />,
      },
    ],
  },
]

export default routes
