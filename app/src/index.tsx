import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

ReactDOM.render(
  <React.StrictMode>
    {/* Example typescript props usage */}
    <App id="id" name="name" />
  </React.StrictMode>,
  document.getElementById("root")
)
