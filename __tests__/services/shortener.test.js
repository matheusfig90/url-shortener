import mockingoose from 'mockingoose'
import { ShortenerService } from '../../services'

let shortenerService

beforeAll(() => {
  mockingoose.resetAll()

  shortenerService = new ShortenerService()
})

it('should save an url', () => {
  // Mocking generate short url method
  jest.spyOn(ShortenerService.prototype, 'generateShortUrl').mockImplementation(() => {
    return 'blah'
  })

  shortenerService.save('https://www.google.com').then(data => {
    expect(data.shortUrl).toEqual('blah')
  })
})

it('should not save an url because already exists', () => {

})

it.skip('should find an original url by short url', () => {
  mockingoose.URL.toReturn({ originalUrl: 'https://www.google.com', shortUrl: 'foo' }, 'findOne')

  shortenerService.findByShortUrl('blah').then(data => {
    expect(data.originalUrl).toEqual('https://www.google.com')
  })
})

it('should find url by original url', async () => {
  mockingoose.URL.toReturn({ originalUrl: 'https://www.google.com', shortUrl: 'foo' }, 'findOne')

  shortenerService.findByOriginalUrl('https://www.google.com').then(data => {
    expect(data.shortUrl).toEqual('foo')
  })
})

it('should returns a true to valid url', () => {
  expect(shortenerService.isValidURL('https://www.google.com')).toBeTruthy()
})

it('should returns a false to invalid url', () => {
  expect(shortenerService.isValidURL('blahblahblah')).toBeFalsy()
})
