import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import itemRouter from './routers/itemRouter'

const app = express()
const port = 3000

// Main url (localhost:3000)
app.get('/', (req, res) => {
  res.send('hi!')
})

// Router controllers
app.use('/item', itemRouter)

// Handle user requesting any other url
app.get('*', (req, res) => {
  res.send('404')
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
