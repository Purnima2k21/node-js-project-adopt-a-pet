import React, { useState } from "react"
import ErrorsList from "./ErrorsList"


const SurrenderPetForm = () => {
  const [newPet, setNewPet] = useState({
    name:"",
    phoneNumber:"",
    email:"",
    petName:"",
    petAge:"",
    petType:"",
    petImageUrl:"",
    vaccinationStatus:"",
    applicationStatus:"pending"
  })

  const [errors, setErrors] = useState([])

  const validFormSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "phoneNumber", "email", "petName", "petType", "petImageUrl"]
    requiredFields.forEach((field) => {
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
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      } else {
        const body = await response.json()
        console.log("Posted successfully!", body);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleInputChange = (event) => {
    setNewPet({
      ...newPet,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(validFormSubmission()){
      addNewPet()
    }
  }

  return (
      <div>
        <h1>Surrender Pet Form</h1>
        <ErrorsList errors={ errors }/>
        <form onSubmit={handleSubmit} className="callout">
        <label htmlFor="name">
         Name:
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={newPet.name}
          />
         </label>

        <label htmlFor="phoneNumber">
         Phone Number:
          <input
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            onChange={handleInputChange}
            value={newPet.phoneNumber}
          />
        </label>

        <label htmlFor="email">
         Email:
          <input
            id="email"
            type="text"
            name="email"
            onChange={handleInputChange}
            value={newPet.email}
          />
        </label>
        
        <label htmlFor="petName">
         Pet Name:
          <input
            id="petName"
            type="text"
            name="petName"
            onChange={handleInputChange}
            value={newPet.petName}
          />
        </label>
        
        <label htmlFor="petAge">
         Pet Age:
          <input
            id="petAge"
            type="text"
            name="petAge"
            onChange={handleInputChange}
            value={newPet.petAge}
          />
        </label>
       
        <label htmlFor="petType">Pet Type: </label>
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
        
        <label htmlFor="petImageUrl">
         Pet Image Url:
          <input
            id="petImageUrl"
            type="text"
            name="petImageUrl"
            onChange={handleInputChange}
            value={newPet.petImageUrl}
          />
        </label>

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
        <input className="button" type="submit" value="Surrender My Pet" />
        </form>
      </div>
  )
}

export default SurrenderPetForm
