import express from "express"

import PetType from "../../../models/PetType.js"

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

export default petsRouter