const express = require('express')
require('dotenv').config()
const airoutes = require('./routes/ai.router.js')
const cors = require('cors')


const app = express()
app.use(express.json())  //middleware to parse JSON request body

app.use(cors())  //middleware to enable CORS

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/api/v1/ai', airoutes)

module.exports = app