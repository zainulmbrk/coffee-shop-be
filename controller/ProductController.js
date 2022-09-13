const Product = require('../model/Product')

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const results = await Product.get(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },

  getProductByID: async (req, res) => {
    try {
      const results = await Product.getByID(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },

  getProductByCategory: async (req, res) => {
    try {
      const results = await Product.getByCategory(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },

  addNewProducts: async (req, res) => {
    console.log(req)
    try {
      const reqModifer = {
        ...req,
        body: { ...req.body, cover: req.file.filename },
      }

      const results = await Product.add(reqModifer, res)
      return res.status(201).send(results)
    } catch (error) {
      return res.status(400).send(error)
    }
  },

  updateProduct: async (req, res) => {
    try {
      let reqModifer = {
        ...req,
      }
      if (req.file) {
        reqModifer = {
          ...req,
          body: { ...req.body, cover: req.file.filename },
        }
      }
      const results = await Product.update(reqModifer, res)
      return res.status(201).send(results)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const results = await Product.remove(req, res)
      return res.status(201).send(results)
    } catch (error) {
      return res.status(400).send(error)
    }
  },
}
