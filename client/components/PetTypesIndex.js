import React, { useState, useEffect } from 'react'

import PetTypeTile from "./PetTypeTile"

const PetTypesIndex = (props) => {
  const [petTypes, setPetTypes] = useState([])

  const getPetTypes = async () => {
    try {
      const response = await fetch("/api/v1/pets")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const petTypeData = await response.json()
      setPetTypes(petTypeData.petTypes)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getPetTypes()
  }, [])

  const petTypeListItems = petTypes.map((petType) => {
    return (
      <PetTypeTile
        key={petType.id}
        petType={petType}
      />
    )
  })

  return (
    <div>
      <h1>Adopt A Pet</h1>
      <ul className="no-bullets">
        {petTypeListItems}
      </ul>
    </div>
  )
}

export default PetTypesIndex