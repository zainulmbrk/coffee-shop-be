const express = require('express')

const {
  getAllCategories,
  addNewCategories,
  getCategoryById,
} = require('../controller/CategoryController')

const uploads = require('../helper/multer')
const router = express.Router()

router.get('/', getAllCategories)
router.get('/:category_id', getCategoryById)
router.post('/', uploads, addNewCategories)

module.exports = router
