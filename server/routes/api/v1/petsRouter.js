import express from "express"

import PetType from "../../../models/PetType.js"
import Pet from "../../../models/Pet.js"

import AdoptionApplication from "../../../models/AdoptionApplication.js"

const petsRouter = express.Router()

petsRouter.get("/", async (req, res) => {
  try {
    const pets = await PetType.findAll()
    return res.status(200).json({ petTypes: pets })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ errors: error })
  }
})

petsRouter.get("/:petType", async (req, res) => {
  try {
    const petsType = req.params.petType
    const pets = await Pet.findByType(petsType.slice(0, -1))
    return res.status(200).json({ pets: pets })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ errors: error })
  }
})

petsRouter.get("/:petType/:id", async (req, res) => {
  try {
    const { petType, id } = req.params
    const pet = await Pet.findById(id)
    if (!pet) return res.status(404).send("404")

    const relPetType = await pet.petType()
    if (petType.slice(0, -1) !== relPetType.type) {
      return res.status(404).send("404")
    }

    return res.status(200).json({ pet: pet })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ errors: error })
  }
})

petsRouter.get("/", async (req, res) => {
  try {
    const applications = await AdoptionApplication.findAll()
    return res.status(200).json({ applications: applications })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ errors: error })
  }
})

petsRouter.post("/", async (req, res) => {
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

export default petsRouter
