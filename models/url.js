import { model } from 'mongoose'

const schema = {
  originalUrl: String,
  shortUrl: {
      type: String,
      index: true,
      unique: true
  }
}

const URL = model('urls', schema)

export default URL
