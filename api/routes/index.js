import express from 'express'
import productRouter from './products.js'
import usersRouter from './users.js'
import categoriesRouter from './categories.js'

function routeApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/products', productRouter)
  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)
}

export default routeApi