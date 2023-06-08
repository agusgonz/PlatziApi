import express from 'express'
const router = express.Router()

router.get('/:categoriesId/products/:productsId', (req, res) => {
  const { categoriesId, productsId } = req.params
  res.send({
    categoriesId,
    productsId
  })
})

export default router