import React from "react"
import { useRoutes } from "react-router-dom"
import routes from "./routes"

export default function App(): JSX.Element {
  const routing = useRoutes(routes())

  return <div>{routing}</div>
}
