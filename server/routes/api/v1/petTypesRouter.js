import express from "express"

import PetType from "../../../models/PetType.js"

const petTypeRouter = express.Router()

petTypesRouter.get("/", async (req, res) => {
   try{
     const pets = await PetType.findAll()
     res.json({ petTypes: pets })
  } catch(error) {
     console.error(error)
   }
}
  
)

export default petTypesRouter