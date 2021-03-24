import React from "react"
import { Link } from "react-router-dom"

const PetTile = ({ id, name, imgUrl, age, vaccinationStatus, petType }) => {
  return (
    <li className="pet-tile">
      <Link to={`/pets/${petType}/${id}`}>
        <h2>{name}</h2>
        <img src={imgUrl} width="300px" />
      </Link>
      <ul className="no-bullets">
        <li>Age: {age}</li>
        <li>Vaccinated: {vaccinationStatus ? "Yes" : "No"}</li>
      </ul>
    </li>
  )
}

export default PetTile
