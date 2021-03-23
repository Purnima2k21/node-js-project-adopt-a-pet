import express from "express"

const clientRoutes = ["/pets"]
router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router
