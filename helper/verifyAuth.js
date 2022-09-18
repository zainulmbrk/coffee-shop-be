const jwt = require('jsonwebtoken')

const verifyAuthAdmin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(404).send({ message: 'Not Found' })
  } else {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, function (
      err,
      decoded,
    ) {
      if (err) {
        return res.status(403).send({ message: 'Access Forbidden' })
      }
      if (decoded.role === process.env.ROLE_ADMIN) {
        next()
      } else if (decoded.role === process.env.ROLE_USER) {
        return res.status(403).send({ message: 'Access Forbidden' })
      }
    })
  }
}

const verifyAuthUser = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(404).send({ message: 'Not Found' })
  } else {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, function (
      err,
      decoded,
    ) {
      if (err) {
        return res.status(403).send({ message: 'Access Forbidden' })
      }
      if (decoded.role === process.env.ROLE_USER) {
        next()
      } else if (decoded.role === !process.env.ROLE_USER) {
        return res.status(403).send({ message: 'Access Forbidden' })
      }
    })
  }
}

module.exports = { verifyAuthAdmin, verifyAuthUser }
