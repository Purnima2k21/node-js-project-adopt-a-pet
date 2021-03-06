import React from "react"
import { Link } from "react-router-dom"
import _ from "lodash"

const PetTypeTile = ({ type, description }) => {
  const images = {
    dog: "https://s3fs.bestfriends.org/s3fs-public/Stax9853MW@2x.png",
    cat: "https://www.pasadosafehaven.org/wp-content/uploads/2020/08/Pax-2.jpg",
    rabbit: "https://www.ddfl.org/wp-content/uploads/2019/04/easter-bunnies.jpg",
  }

  return (
    <li className="pet-tile">
      <Link to={`/pets/${type}s`} width="fit-content">
        <h2>{_.capitalize(type)}s</h2>
        <img src={`${images[type]}`} width="300px" />
      </Link>
      <h5>{description}</h5>
    </li>
  )
}

export default PetTypeTile
