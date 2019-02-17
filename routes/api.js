import { Router } from 'express'
import { ShortenerService } from '../services'

const router = Router()

router.post('/generate', (request, response) => {
  const shortenerService = new ShortenerService()
  shortenerService.save(request.body.url).then(data => {
    response.status(200)
    response.setHeader('Content-Type', 'application/json')
    response.write(JSON.stringify({ shortUrl: data.shortUrl }))
    response.end()
  }).catch(error => {
    response.status(500)
    response.write(JSON.stringify({ message: error.toString() }))
    response.end()
  })
})

router.get('/recover/:id', (request, response) => {
  const shortenerService = new ShortenerService()
  shortenerService.findByShortUrl(request.params.id).then(data => {
    response.redirect(data.originalUrl)
    response.end()
  }).catch(error => {
    response.status(500)
    response.write(JSON.stringify({ message: error.toString() }))
    response.end()
  })
})

export default router
