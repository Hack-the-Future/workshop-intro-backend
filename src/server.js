import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import bodyParser from 'body-parser'
import itemRouter from './routers/itemRouterDB'
import mongooseConnect from './store'

mongooseConnect()

const app = express()
const port = 3000

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Main url (localhost:3000)
app.get('/', (req, res) => {
  res.send('hi!')
})

// Router controllers
app.use('/', itemRouter)

// Handle user requesting any other url
app.get('*', (req, res) => {
  res.status(404).send()
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
