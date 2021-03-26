import React, { useState } from "react"
import ErrorsList from "./ErrorsList"

const SurrenderPetForm = () => {
  const [newPet, setNewPet] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    petName: "",
    petAge: "",
    petType: "",
    petImageUrl: "",
    vaccinationStatus: "",
    applicationStatus: "pending"
  })

  const [errors, setErrors] = useState([])

  const [formSubmitted, setFormSubmitted] = useState(false)

  const validFormSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "phoneNumber", "email", "petName", "petType", "petImageUrl"]
    requiredFields.forEach(field => {
      if (!newPet[field] || newPet[field].trim() === "") {
        submitErrors = { ...submitErrors, [field]: "can't be blank" }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const addNewPet = async () => {
    try {
      const response = await fetch("/api/v1/adoptions", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newPet)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          return setErrors(body.errors)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      } else {
        const body = await response.json()
        return true
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  let isHidden = false
  if (formSubmitted) {
    isHidden = true
  }

  const handleInputChange = event => {
    const { name, value } = event.currentTarget
    setNewPet({ ...newPet, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validFormSubmission()) {
      if (addNewPet()) {
        setFormSubmitted(true)
      }
    }
  }

  return (
    <div>
      <h1>Surrender Pet Form</h1>
      {isHidden && <h3>Your request is in process.</h3>}
      <ErrorsList errors={errors} />
      <form onSubmit={handleSubmit} className="callout">
        <div className="grid-container grid-margin-x">
          <div className="grid-x grid-padding-x">
            <div className="small-4 cell">
              <label htmlFor="name">
                Name:
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  value={newPet.name}
                  placeholder="Your name"
                />
              </label>
            </div>
            <div className="small-4 cell">
              <label htmlFor="phoneNumber">
                Phone Number:
                <input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  onChange={handleInputChange}
                  value={newPet.phoneNumber}
                  placeholder="Phone Number"
                />
              </label>
            </div>
            <div className="small-4 cell">
              <label htmlFor="email">
                Email:
                <input
                  id="email"
                  type="text"
                  name="email"
                  onChange={handleInputChange}
                  value={newPet.email}
                  placeholder="Email"
                />
              </label>
            </div>
            <div className="small-4 cell">
              <label htmlFor="petName">
                Pet Name:
                <input
                  id="petName"
                  type="text"
                  name="petName"
                  onChange={handleInputChange}
                  value={newPet.petName}
                  placeholder="Your pet's name"
                />
              </label>
            </div>
            <div className="small-4 cell">
              <label htmlFor="petAge">
                Pet Age:
                <input
                  id="petAge"
                  type="number"
                  name="petAge"
                  onChange={handleInputChange}
                  value={newPet.petAge}
                  placeholder="Your pet's age"
                />
              </label>
            </div>
            <div className="small-4 cell">
              <label htmlFor="petType">
                Pet Type:
                <select
                  id="petType"
                  type="text"
                  name="petType"
                  onChange={handleInputChange}
                  value={newPet.petType}
                >
                  <option value="">Select a Pet Type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="rabbit">Rabbit</option>
                </select>
              </label>
            </div>
            <div className="small-4 cell">
              <label htmlFor="petImageUrl">
                Pet Image Url:
                <input
                  id="petImageUrl"
                  type="text"
                  name="petImageUrl"
                  onChange={handleInputChange}
                  value={newPet.petImageUrl}
                  placeholder="Url of pet photo"
                />
              </label>
            </div>
            <div className="small-4 cell">
              <label htmlFor="vaccinationStatus">Vaccination Status:</label>
              <div>
                <input
                  type="radio"
                  id="vaccinationStatusTrue"
                  name="vaccinationStatus"
                  onChange={handleInputChange}
                  value="true"
                />
                <label htmlFor="vaccinationStatusTrue">Yes</label>

                <input
                  type="radio"
                  id="vaccinationStatusFalse"
                  name="vaccinationStatus"
                  onChange={handleInputChange}
                  value="false"
                />
                <label htmlFor="vaccinationStatusFalse">No</label>

                <input
                  type="radio"
                  id="vaccinationStatusNull"
                  name="vaccinationStatus"
                  onChange={handleInputChange}
                  value=""
                />
                <label htmlFor="vaccinationStatusNull">Unknown</label>
              </div>
            </div>
            <div className="small-4 cell">
              <input className="button" type="submit" value="Surrender My Pet" />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SurrenderPetForm
