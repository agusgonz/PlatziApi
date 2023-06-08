import express from 'express'
import ProductsService from '../services/products.js'
import { validatorHandling } from '../middlewares/validator-handling.js'
import { createProductSchema, getProductSchema, updateProductSchema, getProductsSizeSchema } from '../schemas/products.js'

const router = express.Router()
const service = new ProductsService()

router.get('/',
  validatorHandling(getProductsSizeSchema, 'query'),
  (req, res) => {
  const { size } = req.query
  const products = service.find(size)

  res.json(products)
})

router.get('/filter', (req, res) => {
  res.send('Filter')
})

router.get('/:id', 
  validatorHandling(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params
    try {
      const product = service.findOne(id)
      res.json(product)
    } catch (err) {
      next(err)
    }
  }
)

router.post('/',
  validatorHandling(createProductSchema, 'body'),
  (req, res) => {
    const { body } = req

    const newProduct = service.create(body)
    res.json(newProduct)
  }
)

router.patch('/:id',
  validatorHandling(getProductSchema, 'params'),
  validatorHandling(updateProductSchema, 'body'),
  (req, res) => {
    const { body, params: { id } } = req
    const editedProduct = service.edit(id, body)
    res.json(editedProduct)
  }
)

router.delete('/:id', (req, res) => {
  const { id } = req.params
  service.delete(id)
  res.send('Product deleted successfully')
  
})

export default router