import express from "express"

const clientRouter = new express.Router()

const clientRoutes = ["/", "/pets", "/pets/:petType", "/pets/:petType/:id"]

clientRouter.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default clientRouter
