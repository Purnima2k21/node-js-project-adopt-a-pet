import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import AdoptionApplicationForm from "./AdoptionApplicationForm.js"

const PetShow = (props) => {
  const [pet, setPet] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const getPet = async () => {
    try {
      const { petType, id } = props.match.params
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

  const handleFormSubmit = () => {
    setShowForm(false)
    setFormSubmitted(true)
  }

  return (
    <div className="pet-tile">
      <img src={pet.imgUrl} width="300px" />
      <h2>{pet.name}</h2>
      <h5>Age: {pet.age}</h5>
      <h5>Vaccinated: {pet.vaccinationStatus ? "Yes" : "No"}</h5>
      <p>{pet.adoptionStory}</p>
      {formSubmitted && <h3>Your request is in process.</h3>}
      <button className="button" onClick={clickAdopt}>
        Adopt Me!
      </button>
      {showForm && <AdoptionApplicationForm petId={pet.id} onFormSubmit={handleFormSubmit}/>}
    </div>
  )
}

export default PetShow
