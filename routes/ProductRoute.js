const express = require('express')

const {
  getAllProducts,
  addNewProducts,
  getProductByID,
  getProductByCategory,
  deleteProduct,
  updateProduct,
} = require('../controller/ProductController')

const verifyAuth = require('../helper/verifyAuth')
const uploads = require('../helper/multer')
const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProductByID)
router.get('/', getProductByCategory)
router.post('/', verifyAuth.verifyAuthAdmin, uploads, addNewProducts)
router.patch('/:product_id', verifyAuth.verifyAuthAdmin, uploads, updateProduct)
router.delete('/:product_id', verifyAuth.verifyAuthAdmin, deleteProduct)

module.exports = router
