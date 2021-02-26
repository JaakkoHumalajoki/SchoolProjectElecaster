import React from "react"
import Layout from "./layout"
import Analysis from "./pages/Analysis"
import Electricity from "./pages/Electricity"
import Home from "./pages/Home"
import Weather from "./pages/Weather"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const routes = () => [
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
        element: <Weather />,
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
