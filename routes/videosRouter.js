const express = require('express')
const protect = require('../middleware/auth')
const router = express.Router()
const {
  getAllVideosController,
  getUserVideosController,
  deleteVideoController
} = require('../controllers/videosController')

router.route('/all-videos').post(protect, getAllVideosController)
router.route('/user-videos').post(protect, getUserVideosController)
router.route('/delete-video').post(protect, deleteVideoController)

module.exports = router
