import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import AdoptionApplicationForm from "./AdoptionApplicationForm.js"

const PetShow = (props) => {
  const { petType, id } = props.match.params
  const [pet, setPet] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const getPet = async () => {
    try {
      const response = await fetch(`/api/v1/pets/${petType}/${id}`)
      if (!response.ok) {
        if (response.status === 404) {
          setNotFound(true)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      setPet(responseBody.pet)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getPet()
  }, [])

  if (notFound) {
    return <Redirect to="/pets/404" />
  }

  const clickAdopt = (event) => {
    event.preventDefault()
    setShowForm(true)
  }

  return (
    <div className="pet-tile">
      <img src={pet.imgUrl} width="300px" />
      <h2>{pet.name}</h2>
      <h5>Age: {pet.age}</h5>
      <h5>Vaccinated: {pet.vaccinationStatus ? "Yes" : "No"}</h5>
      <p>{pet.adoptionStory}</p>
      <button className="button" onClick={clickAdopt}>
        Adopt Me!
      </button>
      {showForm && <AdoptionApplicationForm />}
    </div>
  )
}

export default PetShow
