import React from "react"
import {Link} from "react-router-dom"
// where i want to access each species 

const PetTypeTile = (props) => {
  return (
    <li>
      <img></img>
      <Link to={`/pets/${props.petType}`}>Pet Type</Link>
      <h1>Dogs</h1>
      <h1>Cats</h1>
      <h1>Rabbits</h1>
    </li>
  )
}

export default PetTypeTile
