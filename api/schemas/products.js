import joi from 'joi'

const id = joi.string().uuid()
const name = joi.string().min(3).max(15)
const price = joi.number().integer().min(10).strict()
const image = joi.string().uri()

const productsSize = joi.number().integer().min(1).max(100)

export const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
})

export const updateProductSchema = joi.object({
  name: name,
  price: price,
  image: image
})
export const getProductSchema = joi.object({
  id: id.required()
})
export const getProductsSizeSchema = joi.object({
  size: productsSize
})