import express from "express"

import PetSurrenderApplication from "../../../models/PetSurrenderApplication.js"

const adoptionsRouter = new express.Router()

adoptionsRouter.post("/", async (req, res) => {
  try {
    const formData = req.body
    const newSurrenderApp = new PetSurrenderApplication(formData)
    if (await newSurrenderApp.save()) {
      return res.status(304)
    } else {
      return res.status(422)
    }
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default adoptionsRouter
