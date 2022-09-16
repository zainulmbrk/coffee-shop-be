const db = require('../helper/db_connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { useError } = require('../helper/message')

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT user_id, password, role FROM users WHERE email='${email.toLowerCase()}'`,
        (err, results) => {
          if (err) {
            reject({ message: 'login error' })
          } else {
            if (!results.length) {
              reject({ message: 'wrong email or password' })
            } else {
              bcrypt.compare(
                password,
                results[0].password,
                (errHashing, successHashing) => {
                  if (errHashing) {
                    reject({ message: 'wrong email or password' })
                  }
                  if (successHashing) {
                    const token = jwt.sign(
                      {
                        user_id: results[0].user_id,
                        role: results[0].role,
                      },
                      process.env.JWT_SECRET_KEY,
                    )
                    resolve({
                      message: 'login success',
                      status: 200,
                      data: {
                        token,
                        user_id: results[0].user_id,
                        role: results[0].role,
                      },
                    })
                  } else {
                    reject({ message: 'wrong email or password' })
                  }
                },
              )
            }
          }
        },
      )
    })
  },

  register: (req, res) => {
    const { email, password, phone_number } = req.body
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function (err, hashPassword) {
        if (err) {
          reject({ message: 'something error' })
        } else {
          db.query(
            `INSERT INTO users(email, password, phone_number) VALUES('${email}', '${hashPassword}', '${phone_number}')`,
            (err, results) => {
              if (err) {
                reject(useError(err.code))
              }
              resolve({
                message: 'register success',
                status: 200,
                data: results,
              })
            },
          )
        }
      })
    })
  },
}
