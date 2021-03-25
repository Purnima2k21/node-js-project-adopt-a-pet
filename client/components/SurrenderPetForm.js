import React, { useState } from "react"

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
    applicationStatus:""
  })

  // NOt sure if this error state or redirect will be used
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const addNewPet = async () => {
    try {
      const response = await fetch("/api/v1/surrender-form", {
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
        setShouldRedirect(true)
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
    addNewPet()
  }

  return (
      <div>
        <h1>Surrender Pet Form</h1>
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

        <label htmlFor="phone_number">
         Phone Number:
          <input
            id="phone_number"
            type="text"
            name="phone_number"
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
        
        <label htmlFor="pet_name">
         Pet Name:
          <input
            id="pet_name"
            type="text"
            name="pet_name"
            onChange={handleInputChange}
            value={newPet.petName}
          />
        </label>
        
        <label htmlFor="pet_age">
         Pet Age:
          <input
            id="pet_age"
            type="text"
            name="pet_age"
            onChange={handleInputChange}
            value={newPet.petAge}
          />
        </label>
       
        <label htmlFor="pet_type">Pet Type: </label>
         Pet Type:
          <select
            id=""
            type="text"
            name=""
            onChange={handleInputChange}
            value={newPet.petType}
            >
            <option value="">Select a Pet Type</option>
            <option value="dog">Dog</option> 
            <option value="cat">Cat</option> 
            <option value="rabbit">Rabbit</option>   
          </select>
        
        <label htmlFor="pet_image_url">
         Pet Image Url:
          <input
            id="pet_image_url"
            type="text"
            name="pet_image_url"
            onChange={handleInputChange}
            value={newPet.petImageUrl}
          />
        </label>

        <label htmlFor="vaccination_status">
         Vaccination Status:
          <input
            id="vaccination_status"
            type="text"
            name="vaccination_status"
            onChange={handleInputChange}
            value={newPet.vaccinationStatus}
          />
        </label>

        <input className="button" type="submit" value="Surrender My Pet" />
        </form>
      </div>
  )
}

export default SurrenderPetForm
