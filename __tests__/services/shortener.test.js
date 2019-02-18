import mockingoose from 'mockingoose'
import { ShortenerService } from '../../services'
import { URL } from '../../models'

describe('testing a shortener service', () => {
  let shortenerService

  beforeEach(() => {
    mockingoose.resetAll()
    jest.restoreAllMocks()

    shortenerService = new ShortenerService()
  })

  it('should save an url', async () => {
    expect.assertions(1)

    // Mocking generate short url method
    jest.spyOn(ShortenerService.prototype, 'generateShortUrl').mockImplementation(() => {
      return 'blah'
    })

    const receivedValue = await shortenerService.save('https://www.google.com')
    expect(receivedValue.shortUrl).toEqual('blah')
  })

  it('should not save an url because already exists', async () => {
    expect.assertions(2)

    mockingoose.urls.toReturn({ originalUrl: 'https://www.google.com', shortUrl: 'foobar' }, 'findOne')
    const spyGenerateShortUrl = jest.spyOn(ShortenerService.prototype, 'generateShortUrl')

    const receivedValue = await shortenerService.save('https://www.google.com')
    expect(receivedValue.shortUrl).toEqual('foobar')
    expect(spyGenerateShortUrl).not.toHaveBeenCalled()
  })

  it('should find an original url by short url', async () => {
    expect.assertions(1)

    mockingoose.urls.toReturn({ originalUrl: 'https://www.google.com', shortUrl: 'foo' }, 'findOne')

    const receivedValue = await shortenerService.findByShortUrl('blah')
    expect(receivedValue.originalUrl).toEqual('https://www.google.com')
  })

  it('should find url by original url', async () => {
    expect.assertions(1)

    mockingoose.urls.toReturn({ originalUrl: 'https://www.google.com', shortUrl: 'foo' }, 'findOne')

    const receivedValue = await shortenerService.findByOriginalUrl('https://www.google.com')
    expect(receivedValue.shortUrl).toEqual('foo')
  })

  it('should returns a true to valid url', () => {
    expect(shortenerService.isValidURL('https://www.google.com')).toBeTruthy()
  })

  it('should returns a false to invalid url', () => {
    expect(shortenerService.isValidURL('blahblahblah')).toBeFalsy()
  })
})
