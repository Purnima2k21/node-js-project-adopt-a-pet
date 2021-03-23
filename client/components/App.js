import React from "react"
import { hot } from "react-hot-loader/root"

import { Route, Switch, BrowserRouter } from "react-router-dom"

import PetTypesIndex from "./PetTypesIndex"


const App = props => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/pets' component={PetTypesIndex}/>
        </Switch>
      </BrowserRouter>
    </div>)
}

export default hot(App)
