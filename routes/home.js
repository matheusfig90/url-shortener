import { Router } from 'express'
import path from 'path'

const router = Router()

router.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/../views/home.html'))
})

router.get('/:id', (request, response) => {
  response.redirect(`/api/v1/recover/${request.params.id}`)
  response.end()
})

export default router
