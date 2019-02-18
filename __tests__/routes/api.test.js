import request from 'supertest'
import mockingoose from 'mockingoose'
import app from '../../app'
import { ShortenerService } from '../../services'

beforeEach(() => {
  mockingoose.resetAll()
})

it('should generate a short url', async () => {
  jest.spyOn(ShortenerService.prototype, 'generateShortUrl').mockImplementation(() => {
    return '123asd'
  })

  await request(app)
    .post('/api/v1/generate')
    .send({ url: 'https://www.google1.com' })
    .expect(200)
    .then(response => {
      expect(response.body.shortUrl).toEqual('123asd')
    })
})

it('should recover an url by short url', async () => {
  mockingoose.urls.toReturn({ originalUrl: 'https://twitter.com', shortUrl: 'foo' }, 'findOne')

  await request(app)
    .get('/api/v1/recover/foo')
    .expect(302)
    .then(response => {
      expect(response.header['location']).toEqual('https://twitter.com')
    })
})
