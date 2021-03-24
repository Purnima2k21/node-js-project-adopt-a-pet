import React, { useEffect } from "react"
import { hot } from "react-hot-loader/root"
import { Route, BrowserRouter } from "react-router-dom"
import "foundation-sites"
import $ from "jquery"

import NavBar from "./NavBar"


const App = () => {
  useEffect(() => {
    $(document).foundation()
  }, [])

  return (
    <BrowserRouter>
      <Route path="/" component={NavBar} />
    </BrowserRouter>
  )

}

export default hot(App)
