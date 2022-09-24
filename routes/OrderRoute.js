const express = require('express')

const {
  getAllPayment,
  getPaymentById,
  addPayment,
} = require('../controller/OrderController')

const verifyAuth = require('../helper/verifyAuth')
const uploads = require('../helper/multer')
const router = express.Router()

router.get('/', getAllPayment)
router.get('/:user_id', verifyAuth.verifyAuthUser, getPaymentById)
router.post('/', verifyAuth.verifyAuthUser, addPayment)

module.exports = router
