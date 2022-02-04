import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('item route')
})

export default router
