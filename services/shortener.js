import { URL } from '../models'
import shortid from 'shortid'

class ShortenerService {

  findByShortUrl(shortUrl) {
    return URL.findOne({ shortUrl: shortUrl })
  }

  findByOriginalUrl(url) {
    return URL.findOne({ originalUrl: url })
  }

  async save(url) {
    const doc = await this.findByOriginalUrl(url)
    if (doc != null) {
      return new Promise((resolve, reject) => {
        resolve(doc)
      })
    }

    return new URL({
      originalUrl: url,
      shortUrl: this.generateShortUrl()
    }).save()
  }

  isValidURL(url) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?' + // port
      '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
      '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$'
    , 'i')

    return pattern.test(url)
  }

  generateShortUrl() {
    return shortid.generate()
  }

}

export default ShortenerService
