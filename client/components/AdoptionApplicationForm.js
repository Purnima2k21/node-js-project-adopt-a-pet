import React, { useState } from 'react'
import { Link, Redirect } from "react-router-dom"

const AdoptionApplicationForm = (props) => {
  const [applicationRecord, setApplicationRecord] = useState({ 
    name: "", 
    phoneNumber: "", 
    email: "", 
    homeStatus: "" 
  })
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const addNewApplication = async () => {
    try {
      const response = await fetch("/api/v1/adoption-application", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(applicationRecord)
      })
      if (!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          return setErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      } else {
        const body = await response.json()
        console.log("Your request is in process.", body);
        setShouldRedirect(true)
      }

    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleChange = (event) => {
    setApplicationRecord({
      ...applicationRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addNewApplication()
  }

  if (shouldRedirect) {
    return <Redirect to="/pets" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Apply to Adopt!!!</h1>
      <label htmlFor="name">Name</label>
      <input
        onChange={handleChange}
        id="name"
        name="name"
        value={applicationRecord.name}
        >
      </input>

      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        onChange={handleChange}
        id="phoneNumber"
        name="phoneNumber"
        value={applicationRecord.phoneNumber}
        >
      </input>
    
      <label htmlFor="email">Email</label>
      <input
        onChange={handleChange}
        id="email"
        name="email"
        value={applicationRecord.email}
        >
      </input>

      <label htmlFor="homeStatus">Home Status</label>
      <input
        onChange={handleChange}
        id="homeStatus"
        name="homeStatus"
        value={applicationRecord.homeStatus}
        >
      </input>

      <input type="submit" value="Submit Application" />
    </form>
  )
}

export default AdoptionApplicationForm