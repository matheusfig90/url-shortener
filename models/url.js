import { model } from 'mongoose'

const schema = {
  originalUrl: {
    type: String,
    index: true,
    unique: true
  },
  shortUrl: {
      type: String,
      index: true,
      unique: true
  }
}

const URL = model('urls', schema)

export default URL
