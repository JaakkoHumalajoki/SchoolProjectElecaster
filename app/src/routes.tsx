import React from "react"
import Layout from "./layout"
import Analysis from "./pages/Analysis"
import Electricity from "./pages/Electricity"
import Home from "./pages/Home"
import Weather from "./pages/Weather"
import { WeatherDataPoint } from "./services/fmi"
import { TimeRange } from "./common"
import { ElectricityPageData } from "./services/queries"

/**
 * Routes is responsible for giving page-url:s to each view tab within the app
 * while still remaining as a single page app. Routes also passes props down from
 * App to each subcomponent.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const routes = (
  /**
   * Currently selected city in App state
   */
  city: string,
  /**
   * Callback function for when user selects a new city
   * @param newCity city name as string
   */
  onCityChange: (newCity: string) => void,
  /**
   * Currently selected TimeRange in App state
   */
  timeRange: TimeRange,
  /**
   * Callback function for when user changes TimeRange
   * @param newRange changed TimeRange
   */
  onTimeChange: (newRange: TimeRange) => void,
  /**
   * Weather data held in App state to be shown in subcomponents
   */
  weatherData: WeatherDataPoint[],
  /**
   * ElectricityPageData service from which electricity data can be fetched
   */
  electricityService: ElectricityPageData
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
            electricityService={electricityService}
          />
        ),
      },
      {
        path: "analysis",
        element: (
        <Analysis 
          timeRange={timeRange}
          onTimeChange={onTimeChange}
          electricityService={electricityService}
          city={city}
          onCityChange={onCityChange}
          weatherData={weatherData}
        />
        )
      },
    ],
  },
]

export default routes
