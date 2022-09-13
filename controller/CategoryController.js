const Category = require('../model/Category')

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const results = await Category.get(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },

  getCategoryById: async (req, res, next) => {
    try {
      const results = await Category.getById(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },
  addNewCategories: async (req, res, next) => {
    try {
      const reqModifer = {
        ...req,
        body: { ...req.body, cover: req.file.filename },
      }
      const results = await Category.add(reqModifer, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },
}
