import express from "express"

import PetType from "../../../models/PetType.js"
import Pet from "../../../models/Pet.js"

const petsRouter = express.Router()

petsRouter.get("/", async (req, res) => {
  try {
    const pets = await PetType.findAll()
    res.status(200).json({ petTypes: pets })
  } catch (error) {
    console.error(error)
    res.status(500).json({ errors: error })
  }
})

petsRouter.get("/:petType", async (req, res) => {
  try {
    const petsType = req.params.petType
    const pets = await Pet.findByType(petsType.slice(0, -1))
    res.status(200).json({ pets: pets })
  } catch (error) {
    console.error(error)
    res.status(500).json({ errors: error })
  }
})

export default petsRouter
