const express = require('express')

const {
  getAllPayment,
  getPaymentById,
  addPayment,
  removePayment
} = require('../controller/OrderController')

const verifyAuth = require('../helper/verifyAuth')
const uploads = require('../helper/multer')
const router = express.Router()

router.get('/', getAllPayment)
router.get('/:user_id', verifyAuth.verifyAuthUser, getPaymentById)
router.post('/', verifyAuth.verifyAuthUser, addPayment)
router.delete('/:payment_id', verifyAuth.verifyAuthUser, removePayment)

module.exports = router
