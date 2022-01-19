const multer = require('multer')

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split('.').pop()
    const filename = `${new Date().getTime()}.${fileExt}`
    cb(null, filename)
  }
})

// Filter the file to validate if it meets the required video extension
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'video/mp4') {
    cb(null, true)
  } else {
    cb(
      {
        message: 'Unsupported File Format'
      },
      false
    )
  }
}

// Set the storage, file filter and file size with multer
exports.upload = multer({
  storage,
  limits: {
    fieldNameSize: 200,
    fileSize: 30 * 1024 * 1024
  },
  fileFilter
}).single('video')
