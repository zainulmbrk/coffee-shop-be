const Order = require('../model/Order')

module.exports = {
  getAllPayment: async (req, res) => {
    try {
      const results = await Order.getAllPayment(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },

  getPaymentById: async (req, res) => {
    try {
      const results = await Order.getPaymentById(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },

  addPayment: async (req, res) => {
    try {
      const results = await Order.addPayment(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },

  removePayment: async (req, res) => {
    try {
      const results = await Order.removePayment(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },
}
