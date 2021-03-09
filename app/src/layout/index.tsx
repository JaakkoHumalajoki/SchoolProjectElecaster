import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"

export default (): JSX.Element => {
  return (
    <div className="min-h-screen mx-auto flex flex-col h-screen">
      <Header />
      <main className="w-full max-w-6xl mx-auto flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
