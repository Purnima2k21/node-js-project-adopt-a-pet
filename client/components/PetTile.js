import React from "react"
import { Link } from "react-router-dom"

const PetTile = (props) => {
  return (
    <li>
        <Link to={`/pets/dynamicType/${props.id}`}>
        
        <h1>{props.name}</h1>  </Link> 
        <ul> 
            <li>{props.img_url}</li>
            <li>{props.age}</li>
            <li>{props.vaccination_status}</li>
        </ul>
    </li>
  )
}

export default PetTile