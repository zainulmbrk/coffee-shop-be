const express = require('express')

const {
  getAllOrder,
  getOrderById,
  addOrder,
} = require('../controller/OrderController')

const verifyAuth = require('../helper/verifyAuth')
const uploads = require('../helper/multer')
const router = express.Router()

router.get('/', getAllOrder)
router.get('/:order_id', getOrderById)
router.post('/', addOrder)

module.exports = router
