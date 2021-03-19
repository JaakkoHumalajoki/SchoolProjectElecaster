import React, { useState } from "react"
import { useRoutes } from "react-router-dom"
import routes from "./routes"

export default function App(): JSX.Element {
  const [city, setCity] = useState<string>("tampere")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCityChange = (event: any) => {
    setCity(event.target.value)
  }

  const routing = useRoutes(routes(city, handleCityChange))

  return <div>{routing}</div>
}
