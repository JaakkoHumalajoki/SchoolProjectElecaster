import React from "react"
import Layout from "./layout"
import Analysis from "./pages/Analysis"
import Electricity from "./pages/Electricity"
import Home from "./pages/Home"
import Weather from "./pages/Weather"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const routes = (city: string, onCityChange: (event: any) => void) => [
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
        element: <Weather city={city} onCityChange={onCityChange} />,
      },
      {
        path: "electricity",
        element: <Electricity />,
      },
      {
        path: "analysis",
        element: <Analysis />,
      },
    ],
  },
]

export default routes
