import React, { useState } from 'react'
import ErrorsList from './ErrorsList'

const AdoptionApplicationForm = ({petId, onFormSubmit}) => {
  const [applicationRecord, setApplicationRecord] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    homeStatus: "",
    applicationStatus: "pending",
    petId: petId
  })

  const [errors, setErrors] = useState([])
  
  const validFormSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "phoneNumber", "email", "homeStatus"]
    requiredFields.forEach((field) => {
      if (!applicationRecord[field] || applicationRecord[field].trim() === "") {
        submitErrors = { ...submitErrors, [field]: "can't be blank" }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const addNewApplication = async () => {
    try {
      const response = await fetch("/api/v1/pets", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(applicationRecord)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          return setErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          throw new Error(errorMessage)
        }
      } else {
        const body = await response.json()
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.currentTarget
    setApplicationRecord({ ...applicationRecord, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validFormSubmission()) {
      addNewApplication()
      onFormSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <h1>Apply to Adopt!!!</h1>
      <ErrorsList errors={errors}/>
      <label htmlFor="name">Name
      <input
        type="text"
        onChange={handleChange}
        id="name"
        name="name"
        value={applicationRecord.name}
      />
      </label>

      <label htmlFor="phoneNumber">Phone Number
      <input
        type="tel"
        onChange={handleChange}
        id="phoneNumber"
        name="phoneNumber"
        value={applicationRecord.phoneNumber}
      />
      </label>

      <label htmlFor="email">Email
      <input 
        type="email"
        onChange={handleChange}
        id="email"
        name="email"
        value={applicationRecord.email}
      />
      </label>

      <label htmlFor="homeStatus">Home Status
        <select onChange={handleChange} value={applicationRecord.homeStatus} name="homeStatus" id="homeStatus">
          <option value="">Select an option:</option>
          <option value="own">Own</option>
          <option value="rent">Rent</option>
        </select>
      </label>

        <input className="button" type="submit" value="Submit Application" />
    </form>  
  )
}

export default AdoptionApplicationForm
