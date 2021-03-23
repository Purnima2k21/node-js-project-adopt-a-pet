import express from "express"

const router = new express.router

const clientRoutes = ["/pets"]
router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router
