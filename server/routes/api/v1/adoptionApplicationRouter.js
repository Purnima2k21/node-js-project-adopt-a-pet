import express from "express"

import AdoptionApplication from "../../../models/AdoptionApplication.js"

const adoptionApplictionRouter = new express.Router()

adoptionApplictionRouter.get("/", async (req, res) => {
  try {
    const applications = await AdoptionApplication.findAll()
    return res.status(200).json({ applications: applications })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ errors: error })
  }
})

adoptionApplictionRouter.get("/:id", async (req, res) => {
  try {
    const applicationId = req.params.id
    const adoptionApplication = await AdoptionApplication.findById(applicationId)
    return res.status(200).json({ adoptionApplication: adoptionApplication })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

adoptionApplictionRouter.post("/", async (req, res) => {
  try {
    const formData = req.body
    const newAdoptionApplication = new AdoptionApplication(formData)

    if (await newAdoptionApplication.save()) {
      return res.status(201).json({ adoptionApplication: newAdoptionApplication })
    } else {
      return res.status(422).json({ errors: newAdoptionApplication.errors })
    }
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default adoptionApplictionRouter