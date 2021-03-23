import React, { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import PetTile from './PetTile'



const PetIndex=  props => {
    const [pets, setPets] = useState([])

    const getPets = async () => {
        try {
          const response = await fetch("/api/v1/pets")
          if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw(error)
          }
          const petData = await response.json()
          setPets(petData.pets)
        } catch(err) {
          console.error(`Error in fetch: ${err.message}`)
        }
      }

      useEffect(() => {
        getPets()
      }, [])

    const petIndexItems = pets.map(pet => {
        return(
          <PetTile
            key={pet.id}
            id={pet.id}
            name={pet.name}
            img_url={pet.img_url}
            age={pet.age}
            vaccination_status={pet.vaccination_status}
          />
        )
      })

    return(
        <div>
            <h1>Placeholder</h1>
            <ul>
                {petIndexItems}
            </ul>
        </div>
    )
}

export default PetIndex