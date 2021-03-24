import React, {  useState, useEffect } from "react"
import PetTile from './PetTile'

const PetsIndex = (props) => {
  const [pets, setPets] = useState([])
  const { petType } = props.match.params

  const getPetType = async () => {
    try {
      const response = await fetch("/api/v1/pets")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const petData = await response.json()
      console.log(petData)
      setPets(petData.pets)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getPetType()
  }, [])

  // const petsIndexItems = pets.map(pet => {
  //   return(
  //     <PetTile
  //       key={pet.id}
  //       id={pet.id}
  //       name={pet.name}
  //       img_url={pet.img_url}
  //       age={pet.age}
  //       vaccination_status={pet.vaccination_status}
  //     />
  //   )
  // })

  return(
    <div>
        <h1>List of {petType}</h1>
        <ul>
            {/* {petsIndexItems} */}
        </ul>
    </div>
) 
  
  
}

export default PetsIndex
