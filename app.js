import express from 'express'
import mongoose from 'mongoose'
import logger from 'morgan'
import * as routes from './routes'

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin`,
  { useNewUrlParser: true }
)

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', routes.api)

app.listen(9000)

export default app
