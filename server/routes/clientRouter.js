import express from "express"

const clientRouter = new express.Router()

const clientRoutes = ["/"]
clientRouter.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default clientRouter
