const express = require('express')
const protect = require('../middleware/auth')
const router = express.Router()
const {
  uploadVideoDetailsController,
  uploadVideoController
} = require('../controllers/uploadVideoController')
const { upload } = require('../middleware/multerConfig')

router.route('/video-details').post(protect, uploadVideoDetailsController)
router.route('/upload-video').post(protect, upload, uploadVideoController)

module.exports = router
