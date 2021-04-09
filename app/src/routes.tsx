import React from "react"
import Layout from "./layout"
import Analysis from "./pages/Analysis"
import Electricity from "./pages/Electricity"
import Home from "./pages/Home"
import Weather from "./pages/Weather"
import WeatherService from "./services/fmi"
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
  city: City,
  /**
   * Callback function for when user selects a new city
   * @param newCity selected City object
   */
  onCityChange: (newCity: City) => void,
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
   * WeatherService from which weather-related data can be fetched
   */
  weatherService: WeatherService,
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
            weatherService={weatherService}
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
            city={city}
            onCityChange={onCityChange}
            timeRange={timeRange}
            onTimeChange={onTimeChange}
            weatherService={weatherService}
            electricityService={electricityService}
          />
        ),
      },
    ],
  },
]

export default routes
