import React, { useState, useEffect } from "react"
import _ from "lodash"

import PetTile from "./PetTile"

const PetsIndex = (props) => {
  const [pets, setPets] = useState([])
  const { petType } = props.match.params

  const getPetsOfType = async () => {
    try {
      const response = await fetch(`/api/v1/pets/${petType}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const petData = await response.json()
      setPets(petData.pets)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getPetsOfType()
  }, [petType])

  const petsIndexItems = pets.map((pet) => {
    return <PetTile key={pet.id} petType={petType} {...pet} />
  })

  return (
    <div>
      <h1>{_.capitalize(petType)} Available for Adoption</h1>
      <div className="grid-container">
        <ul className="no-bullets grid-x grid-padding-x">{petsIndexItems}</ul>
      </div>
    </div>
  )
}

export default PetsIndex
