const db = require('../helper/db_connection')

module.exports = {
  getAllBook: (req, res) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM book`, (err, results) => {
        if (err) {
          res.status(500)
          reject({ status: 'failed', message: 'error' })
        }
        if (results == 0) {
          resolve({ message: 'no data rows' })
        } else {
          resolve({
            status: true,
            message: 'get order success',
            data: results,
          })
        }
      })
    })
  },

  getBookById: (req, res) => {
    return new Promise((resolve, reject) => {
      const { order_id } = req.params
      const sql = `SELECT * FROM book WHERE order_id=${order_id}`
      db.query(sql, (err, results) => {
        if (err) {
          res.status(500)
          reject({ message: 'error' })
        }
        resolve({
          status: true,
          message: 'get order success',
          data: results,
        })
      })
    })
  },

  addBook: (req, res) => {
    return new Promise((resolve, reject) => {
      const { product_id, total_price, address } = req.body
      const sql = `INSERT INTO book (product_id, total_price, address) VALUES ('${product_id}', '${total_price}', '${address}')`
      db.query(sql, (err, results) => {
        if (err) {
          res.status(500)
          reject({ message: 'error' })
        }
        resolve({
          status: true,
          message: 'add success',
          data: results,
        })
      })
    })
  },
}
