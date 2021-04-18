import React from "react"
import { Outlet } from "react-router-dom"

import Header from "./Header/Header"
import Footer from "./Footer/Footer"

import ErrorBoundary from "../ErrorBoundary"

export default (): JSX.Element => {
  return (
    <div className="min-h-screen h-full mx-auto flex flex-col">
      <Header />
      <main className="w-full max-w-6xl mx-auto flex-grow">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
