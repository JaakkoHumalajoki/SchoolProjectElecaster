import React from "react"
import Layout from "./layout"
import Analysis from "./pages/Analysis"
import Electricity from "./pages/Electricity"
import Home from "./pages/Home"
import Weather from "./pages/Weather"
import { WeatherDataPoint } from "./services/fmi"
import { TimeRange } from "./common"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const routes = (
  city: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCityChange: (event: any) => void,
  timeRange: TimeRange,
  onTimeChange: (newRange: TimeRange) => void,
  weatherData: WeatherDataPoint[]
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
          <Electricity timeRange={timeRange} onTimeChange={onTimeChange} />
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
