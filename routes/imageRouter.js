const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const { validateImageKeyParams } = require('../middleware/validateParams')
const {
  uploadImageController,
  deleteImageController,
  downloadImageController,
  getUserImageKeyController
} = require('../controllers/imageController')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router
  .route('/upload-image')
  .post(protect, upload.single('image'), uploadImageController)
router
  .route('/download-image/:key')
  .get(
    protect,
    validateImageKeyParams,
    upload.single('image'),
    downloadImageController
  )

router.route('/get-image/:userId').get(protect, getUserImageKeyController)

router
  .route('/delete-image')
  .delete(protect, upload.single('image'), deleteImageController)

module.exports = router
