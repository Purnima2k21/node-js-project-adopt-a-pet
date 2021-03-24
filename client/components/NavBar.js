import React from "react"
import { Link, Switch, Route } from "react-router-dom"

import PetTypesIndex from "./PetTypesIndex"
import PetsIndex from "./PetsIndex"
import SurrenderPetForm from "./SurrenderPetForm"

const NavBar = () => {
  return (
    <>
      <nav data-sticky-container>
        <div className="top-bar" data-sticky data-options="marginTop:0;" style={{ width: "100%" }}>
          <div className="top-bar-left">
            <ul className="menu">
              <li>
                <Link to="/pets">Pet Types</Link>
              </li>
              <li>
                <Link to="/pets/dogs">Dogs</Link>
              </li>
              <li>
                <Link to="/pets/cats">Cats</Link>
              </li>
              <li>
                <Link to="/pets/rabbits">Rabbits</Link>
              </li>
              <li>
                <Link to="/adoptions/new">Surrender Pet Form</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="grid-container text-center">
        <Switch>
          <Route exact path="/pets" component={PetTypesIndex} />
          <Route exact path="/pets/:petType" component={PetsIndex} />
          <Route exact path="/adoptions/new" component={SurrenderPetForm} />
        </Switch>
      </div>
    </>
  )
}

export default NavBar
