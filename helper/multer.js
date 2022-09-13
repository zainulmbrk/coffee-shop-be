const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const forms = multer()
const app = express()
const path = require('path')

app.use(bodyParser.json())
app.use(forms.array())
app.use(bodyParser.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  },
}) //INI GA KEPANGGIL MAKANYA GA JALAN SI UPLOADNYA NUL

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname)

  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return cb(new Error('file not supported'))
  }
  cb(null, true)
}

const addCover = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single('cover')

const uploads = (req, res, next) => {
  addCover(req, res, (err) => {
    if (err) {
      // console.log('kesini')
      return res.json({ message: err.message })
    } else if (err) {
      // console.log('kaga')
      return res.json({ message: 'Failed to upload image!' })
    }
    // console.log('eh kesini')
    next()
  })
}

module.exports = uploads
