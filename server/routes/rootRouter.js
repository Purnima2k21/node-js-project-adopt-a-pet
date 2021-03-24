import express from "express"
import clientRouter from "./clientRouter.js"
import petsRouter from "./api/v1/petsRouter.js"

const rootRouter = new express.Router()

rootRouter.get("/", (req, res) => {
  res.redirect("/pets")
})

rootRouter.use("/", clientRouter)
rootRouter.use("/api/v1/pets", petsRouter)

export default rootRouter
