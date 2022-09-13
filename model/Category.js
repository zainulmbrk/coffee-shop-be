const db = require('../helper/db_connection')

module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM category`
      db.query(sql, (err, results) => {
        if (err) {
          console.log(err)
          reject({ message: 'error' })
        }
        resolve({
          status: true,
          message: 'get category success',
          data: results,
        })
      })
    })
  },

  getById: (req, res) => {
    return new Promise((resolve, reject) => {
      const { category_id } = req.params

      const sql = `SELECT category_name ,GROUP_CONCAT(product_name) as product_name FROM category join product ON category.category_id = product.category_id where category.category_id = ${category_id} GROUP BY category_name`
      db.query(sql, (err, results) => {
        if (err) {
          console.log(err)
          reject({ message: 'get category By Id failed' })
        }
        resolve({
          status: true,
          message: 'get category By Id success',
          data: results,
        })
      })
    })
  },

  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const { category_name, cover } = req.body
      db.query(
        `INSERT INTO category(category_name, cover) VALUES('${category_name}', '${cover}')`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'something error' })
          }
          resolve({
            message: 'add new category success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },
}
