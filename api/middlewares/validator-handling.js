import boom from "@hapi/boom"

export const validatorHandling = (schema, property) => {
  return (req, res, next) => {
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false })
    if (error) {
      next(boom.badRequest(error))
    } else {
      next()
    }
  }
}