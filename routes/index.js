const express = require('express')
const app = express()
const path = require('path')

const ProductRoute = require('./ProductRoute')
const CategoryRoute = require('./CategoryRoute')
const AuthRoute = require('./AuthRoute')
const OrderRoute = require('./OrderRoute')

app.use('/product', ProductRoute)
app.use('/category', CategoryRoute)
app.use('/auth', AuthRoute)
app.use('/payment', OrderRoute)

module.exports = app
