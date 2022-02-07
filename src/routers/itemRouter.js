import { Router } from 'express'

const wrapperRouter = Router()
const itemRouter = Router()
const itemsRouter = Router()

wrapperRouter.use('/item', itemRouter)
wrapperRouter.use('/items', itemsRouter)

const list = []

itemRouter.get('/:index', (req, res) => {
  const { index } = req.params
  console.log('getting', index)
  console.log(list)
  return res.send({ item: list[index] })
})

itemRouter.post('/', (req, res) => {
  const { title, description } = req.body
  list.push({ title, description })
  console.log('adding', req.body)
  console.log(list)
  return res.send({ itemIndex: list.length - 1 })
})

itemRouter.put('/:index', (req, res) => {
  const { index } = req.params
  const { title, description } = req.body
  if (index == null)
    return res.status(400).send({ error: 'Missing itemIndex field' })

  list[index] = { title, description }
  console.log('putting', req.body)
  console.log(list)
  return res.send({ item: list[index] })
})

itemRouter.delete('/:index', (req, res) => {
  const { index } = req.params
  const { title, description } = req.body

  const idx =
    index ??
    list.findIndex(
      ({ title: itemTitle, description: itemDescription }) =>
        title === itemTitle && itemDescription === description
    )

  const deletedItem = list.splice(idx, 1)

  console.log('deleting', req.body)
  console.log(list)
  return res.send({ item: deletedItem })
})

// Items
itemsRouter.get('/', (req, res) => {
  return res.send({ itemList: list })
})

export default wrapperRouter
