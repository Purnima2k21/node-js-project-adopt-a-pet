import React from "react"
import { hot } from "react-hot-loader/root"

import { Route, Switch, BrowserRouter } from "react-router-dom"
import NavBar from "./NavBar"

const App = (props) => {
  return (
    <BrowserRouter>
      <Route path="/" component={NavBar} />
    </BrowserRouter>
  )
}

export default hot(App)
