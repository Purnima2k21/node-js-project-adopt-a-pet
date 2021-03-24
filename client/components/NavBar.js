import React from "react"
import { Link, Switch, Route } from "react-router-dom"

import PetTypesIndex from "./PetTypesIndex"
import PetsIndex from "./PetsIndex"
import SurrenderPetForm from "./SurrenderPetForm"

const NavBar = () => {
  return (
    <div className="row column">
      <div className="navbar">
        <Link to="/pets">Pet Types</Link>
        <Link to="/pets/dog">Dog</Link>
        <Link to="/pets/cat">Cats</Link>
        <Link to="/pets/rabbit">Rabbits</Link>
      </div>
      <Switch>
        <Route exact path="/pets" component={PetTypesIndex} />
        <Route exact path="/pets/dog" component={<PetsIndex petType="dog" />} />
        <Route exact path="/pets/cat" render={<PetsIndex petType="cat" />} />
        <Route exact path="/pets/rabbit" render={<PetsIndex petType="rabbit" />} />
      </Switch>
    </div>
  )
}

export default NavBar
