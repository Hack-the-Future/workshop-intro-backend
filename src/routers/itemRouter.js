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

itemRouter.put('/', (req, res) => {
  const { itemIndex, title, description } = req.body
  if (itemIndex == null)
    return res.status(400).send({ error: 'Missing itemIndex field' })

  list[itemIndex] = { title, description }
  console.log('putting', req.body)
  console.log(list)
  return res.send({ item: list[itemIndex] })
})

itemRouter.patch('/', (req, res) => {
  const { itemIndex, ...update } = req.body

  if (itemIndex == null)
    return res.status(400).send({ error: 'Missing itemIndex field' })

  list[itemIndex] = { ...list[itemIndex], ...update }
  console.log('patching', req.body)
  console.log(list)
  return res.send({ item: list[itemIndex] })
})

itemRouter.delete('/', (req, res) => {
  const { itemIndex, title, description } = req.body

  const idx =
    itemIndex ??
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
