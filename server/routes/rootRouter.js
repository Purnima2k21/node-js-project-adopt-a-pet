import express from "express"
import clientRouter from "./clientRouter.js"
import petsRouter from "./api/v1/petsRouter.js"
import surrenderFormRouter from "./api/v1/surrenderFormRouter"
const rootRouter = new express.Router()

rootRouter.use()

rootRouter.use("/", clientRouter)

rootRouter.use("/api/v1/pets", petsRouter)
rootRouter.use('/api/v1/surrender-form', surrenderFormRouter)


export default rootRouter
