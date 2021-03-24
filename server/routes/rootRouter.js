import express from "express"
import clientRouter from "./clientRouter.js"

const rootRouter = new express.Router()

rootRouter.get("/", (req, res) => {
  res.redirect("/pets")
})

rootRouter.use("/", clientRouter)

export default rootRouter
