const Product = require('../model/Order')

module.exports = {
  getAllOrder: async (req, res) => {
    try {
      const results = await Product.getAllBook(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },

  getOrderById: async (req, res) => {
    try {
      const results = await Product.getBookById(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },

  addOrder: async (req, res) => {
    try {
      const results = await Product.addBook(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },
}
