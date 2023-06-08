export const errorLogger = (err, req, res, next) => {
  next(err)
}
export const boomErrorHandling = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).send(output.payload)
  } else {
    next(err)
  }
}
export const errorHandling = (err, req, res, next) => {
  res.status(500).send(err.message)
}

