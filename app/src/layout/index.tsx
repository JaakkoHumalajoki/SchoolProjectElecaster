import React from "react"
import { Outlet } from "react-router-dom"

import Header from "./Header/Header"
import Footer from "./Footer/Footer"

import ErrorBoundary from "../ErrorBoundary"

export default (): JSX.Element => {
  return (
    <div className="min-h-screen h-full mx-auto flex flex-col">
      <Header />
      <main className="mt-16 sm:mt-24 flex w-full max-w-6xl mx-auto flex-grow justify-center">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
