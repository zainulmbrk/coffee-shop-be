const db = require('../helper/db_connection')

module.exports = {
  getAllPayment: (req, res) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM payment`, (err, results) => {
        if (err) {
          res.status(500)
          reject({ status: 'failed', message: 'error' })
        }
        if (results == 0) {
          resolve({ message: 'no data rows' })
        } else {
          resolve({
            status: true,
            message: 'get payment success',
            data: results,
          })
        }
      })
    })
  },

  getPaymentById: (req, res) => {
    return new Promise((resolve, reject) => {
      const { order_id } = req.params
      const sql = `SELECT * FROM payment WHERE order_id=${order_id}`
      db.query(sql, (err, results) => {
        if (err) {
          res.status(500)
          reject({ message: 'error' })
        }
        resolve({
          status: true,
          message: 'get payment success',
          data: results,
        })
      })
    })
  },

  addPayment: (req, res) => {
    return new Promise((resolve, reject) => {
      const { user_id, product_id, product_name, total_price } = req.body
      const sql = `INSERT INTO payment(user_id, product_id, product_name, total_price) VALUES ('${user_id}','${product_id}', '${product_name}', '${total_price}')`
      db.query(sql, (err, results) => {
        if (err) {
          res.status(500)
          reject({ message: 'error' })
          console.log(err)
        }
        resolve({
          status: true,
          message: 'payment success',
          data: results,
        })
      })
    })
  },
}
