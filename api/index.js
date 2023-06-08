import express from 'express'
import cors from 'cors'
import routeApi from './routes/index.js'
import { errorLogger, errorHandling, boomErrorHandling } from './middlewares/error-handling.js';

const app = express();
const port = process.env.PORT || 3100;
app.use(express.json())

const whitelist = ['http://127.0.0.1:5500', 'https://google.com']

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('not allow'))
    }
  }
}

app.use(cors(options))

app.get('/api', (req, res) => {
  res.send('hola mi server en express')
})

routeApi(app)


app.use(errorLogger)
app.use(boomErrorHandling)
app.use(errorHandling)

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
});