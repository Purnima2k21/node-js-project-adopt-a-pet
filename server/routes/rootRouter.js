import express from "express"
import clientRouter from "./clientRouter.js"
import petsRouter from "./api/v1/petsRouter.js"
import adoptionApplictionRouter from "./api/v1/adoptionApplicationRouter.js"

const rootRouter = new express.Router()

rootRouter.get("/", (req, res) => {
  res.redirect("/pets")
})

rootRouter.use("/", clientRouter)
rootRouter.use("/api/v1/pets", petsRouter)
rootRouter.use("/api/v1/adoption-application", adoptionApplictionRouter)

export default rootRouter
