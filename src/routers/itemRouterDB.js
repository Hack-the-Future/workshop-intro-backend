import { Router } from 'express'
import ListItem from '../store/models/listItem'

const wrapperRouter = Router()
const itemRouter = Router()
const itemsRouter = Router()

wrapperRouter.use('/item', itemRouter)
wrapperRouter.use('/items', itemsRouter)

const list = []

itemRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const item = await ListItem.findById(id)
    console.log('getting item')
    return res.send({ item })
  } catch (e) {
    console.error(e)
    return res.status(500).send({ error: 'unable to find item' })
  }
})

itemRouter.post('/', async (req, res) => {
  try {
    const { title, description } = req.body
    const item = new ListItem({ title, description })
    console.log('added item')
    await item.save()
    return res.send({ item })
  } catch (e) {
    console.error(e)
    return res.status(500).send({ error: 'unable to create item' })
  }
})

const updateItem = async (id, update) => {
  // Either method works

  // return ListItem.findByIdAndUpdate(
  //   id,
  //   {
  //     $set: update,
  //   },
  //   { new: true }
  // )
  const { title, description } = update
  const item = await ListItem.findById(id)
  item.title = title ?? item.title
  item.description = description ?? item.description
  await item.save()
  return item
}

itemRouter.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body
    const { id } = req.params

    const item = await updateItem(id, { title, description })
    console.log('putting')
    return res.send({ item })
  } catch (e) {
    console.error(e)
    return res.status(500).send({ error: 'unable to update item' })
  }
})

itemRouter.patch('/:id', async (req, res) => {
  try {
    const update = req.body
    const { id } = req.params

    const item = await updateItem(id, update)
    console.log('patching')
    return res.send({ item })
  } catch (e) {
    console.error(e)
    return res.status(500).send({ error: 'unable to update item' })
  }
})

itemRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const item = await ListItem.findByIdAndDelete(id)
    console.log('deleting')
    return res.send({ item })
  } catch (e) {
    console.error(e)
    return res.status(500).send({ error: 'unable to delete item' })
  }
})

// Items
itemsRouter.get('/', async (req, res) => {
  try {
    const items = await ListItem.find()
    return res.send({ items })
  } catch (e) {
    console.error(e)
    return res.status(500).send({ error: 'unable to get items' })
  }
})

export default wrapperRouter
