import React, { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import { Route, BrowserRouter } from "react-router-dom"
import "foundation-sites"
import $ from "jquery"
import "regenerator-runtime/runtime"

import NavBar from "./NavBar"
import AdoptionApplicationForm from "./AdoptionApplicationForm"

const App = () => {
  useEffect(() => {
    $(document).foundation()
  }, [])

  return (
    <BrowserRouter>
      <Route path="/" component={NavBar} />
      <Route path="/adoption-application" component={AdoptionApplicationForm} />
    </BrowserRouter>
  )
}

export default hot(App)
