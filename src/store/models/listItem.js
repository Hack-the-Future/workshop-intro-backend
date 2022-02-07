import { Schema, model } from 'mongoose'

const listItemSchema = Schema({
  title: String,
  description: String,
})

const ListItem = model('ListItem', listItemSchema)

export default ListItem
