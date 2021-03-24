import express from "express"

import PetSurrenderApplication from "../../../models/PetSurrenderApplication"

const PetSurrenderApplicationRouter = new express.Router()

PetSurrenderApplicationRouter.post("/", async (req, res) => {
  try {
    const formData = req.body
    // console.log(formData)
    const newSurrenderApp = new PetSurrenderApplication(formData)
    // console.log(newCat)

    // THIS??
    await newSurrenderApp.save()
    // OR
    // **********NOT SURE WHATS NEEDED FROM BELOW***********
    // return newCat if successfully persisted
    // if (await newSurrenderApp.save()) {
    //   return res.json({ cat : newCat })
    // } else {
    //   return res.status(422).json({ errors: newCat.errors })
    // }
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default surrenderFormRouter