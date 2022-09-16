require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 1102
const bodyParser = require('body-parser')
const router = require('./routes')
const path = require('path')

app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/v1', router)

app.listen(port, () => {
  console.log(`coffee shop listening on port ${port}`)
})
