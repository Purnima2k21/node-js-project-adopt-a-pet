import express from "express"

const router = new express.Router()

const clientRoutes = ["/", "/pets", "/pets/:petType", "/api/v1/surrender-form"]

clientRouter.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router
