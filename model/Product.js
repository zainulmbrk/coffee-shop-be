const db = require('../helper/db_connection')
const fs = require('fs')

module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      const {
        product_name = '',
        limit = 12,
        page = 1,
        sortby = `desc`,
        order = `product_name`,
      } = req.query
      const offset = (page - 1) * limit
      const sql = `SELECT p.product_id, p.product_name, p.category_id, c.category_name, p.price, p.product_description, p.cover, p.created_at FROM product p LEFT JOIN category c ON p.category_id = c.category_id
      ${
        product_name ? `WHERE product_name LIKE '%${product_name}%'` : ''
      } ORDER BY ${order} ${sortby} LIMIT ${limit} OFFSET ${offset}`
      db.query(sql, (err, results) => {
        if (err) {
          console.log(err)
          reject({ message: 'error' })
        } else {
          db.query(`SELECT product_id FROM product`, (err, result) => {
            if (err) {
              console.log(err)
              reject({
                message: 'Something wrong',
              })
            } else {
              totalPage = Math.ceil(result.length / limit)
              if (page > totalPage) {
                reject({
                  message: 'Page not found!',
                  status: 404,
                  data: [],
                })
              }
              resolve({
                message: 'Get All From product Success',
                status: 200,
                data: {
                  totalRow: results.length,
                  totalPage: totalPage,
                  results: results,
                },
              })
            }
          })
        }
        // resolve({
        //   message: 'get All from product success',
        //   status: 200,
        //   data: results,
        // })
      })
    })
  },

  getByID: (req, res) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM product WHERE product_id='${req.params.id}'`,
        (err, results) => {
          if (err) {
            reject({
              message: 'error',
              status: 500,
            })
          }
          if (!results) {
            reject({
              message: 'product not available',
              status: 500,
            })
          }
          resolve({
            message: 'get product byId success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },

  // getByCategory:(req, res)=>{
  //   return new Promise((resolve, reject)=>{
  //     const {category_name} = req.query
  //     db.query(`SELECT category_name ,GROUP_CONCAT(product_name) FROM product join category ON product.category_id = category.category_id GROUP BY category_name WHERE category_name = ${category_name};
  //     `,(err, results)=>{
  //       if(err){
  //         console.log(err)
  //         reject({message:'get product failed'})
  //       }resolve({
  //         message:'get product by category success',
  //         data: results
  //       })
  //     })
  //   })
  // },

  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const {
        product_name,
        category_id,
        price,
        product_description,
        cover,
      } = req.body
      console.log(req.body, 'suuu')
      db.query(
        `INSERT INTO product(product_name, category_id, price, product_description, cover) VALUES('${product_name}', '${category_id}', '${price}', '${product_description}', '${cover}')`,
        (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: 'error' })
          }
          resolve({
            message: 'add new product success',
            status: 200,
            data: results,
          })
        },
      )
    })
  },

  update: (req, res) => {
    return new Promise((resolve, reject) => {
      const { product_id } = req.params

      db.query(
        `SELECT * FROM product WHERE product_id='${req.params.product_id}'`,
        (err, results) => {
          if (err) {
            res.send({ message: 'ada error' })
          }

          const previousData = {
            ...results[0],
            ...req.body,
          }
          const {
            product_name,
            category_id,
            price,
            product_description,
            cover,
          } = previousData

          const tempImg = results[0].cover

          if (req.body.cover) {
            fs.unlink(`uploads/${tempImg}`, function (err) {
              if (err) {
                console.log(err)
                reject({
                  message: 'something error',
                })
              }
            })
          }

          db.query(
            `UPDATE product SET product_name='${product_name}', cover='${cover}', category_id='${category_id}', price='${price}', product_description='${product_description}' WHERE product_id=${product_id}`,
            (err, results) => {
              if (err) {
                reject({ message: 'ada error' })
              }

              resolve({
                message: 'update product success',
                status: 200,
                data: results,
              })
            },
          )
        },
      )
    })
  },

  remove: (req, res) => {
    return new Promise((resolve, reject) => {
      const { product_id } = req.params
      db.query(
        `SELECT cover FROM product WHERE product_id='${req.params.product_id}'`,
        (err, results) => {
          if (err) {
            console.log(err)
          }
          if (!results.length) {
            reject({ message: 'id not found' })
          } else {
            let coverTemp = results[0].cover
            db.query(
              `DELETE FROM product WHERE product_id=${product_id}`,
              (err, results) => {
                if (err) {
                  reject({ success: false })
                }
                fs.unlink(`./uploads/${coverTemp}`, function (err) {
                  if (err)
                    resolve({
                      success: true,
                      message: 'Delete Product Success',
                      data: results,
                    })
                })
                resolve({
                  success: true,
                  message: 'Delete Product Success',
                  data: results,
                })
              },
            )
          }
        },
      )
    })
  },
}
