import React from "react"

export default (): JSX.Element => (
  <footer className="bg-gray-300 h-72 sm:h-48 shadow-inner relative w-full -bottom-72 sm:-bottom-48">
    <div className="max-w-2xl flex flex-col-reverse sm:flex-row justify-evenly items-center mt-0 m-4 mx-auto">
      <div className="">
        <p className="m-4 pt-2 text-center sm:text-left">
          Elecaster is an application for visualizing weather and electricity
          data history and forecast in Finland. The data is fetched directly
          from Finnish Meteorological Institute and Fingrid by your browser.
        </p>
        <p className="m-4 text-center sm:text-left">
          Elecaster is Tampere University course COMP.SE.110-2020-2021-1
          Software Design project. It was built during spring 2021
        </p>
      </div>
      <div className="h-20 w-0 border mx-3.5 bg-gray-500 hidden sm:m-0 sm:block" />
      <div className="flex w-72 justify-between pl-4 sm:flex-col m-4">
        <a href="/">Home</a>
        <a href="/weather">Weather</a>
        <a href="/electricity">Electricity</a>
        <a href="/analysis">Analysis</a>
      </div>
    </div>
    <div className="text-center mx-auto max-w-6xl -m-3 font-thin text-gray-600">
      <p>
        <i>© {new Date().getFullYear()} Elecaster creators</i>
      </p>
    </div>
  </footer>
)
