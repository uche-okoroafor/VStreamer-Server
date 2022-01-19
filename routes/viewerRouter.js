const express = require('express')
const protect = require('../middleware/auth')
const router = express.Router()
const { addViewerController } = require('../controllers/viewerController')

router.route('/add-viewer').post(protect, addViewerController)

module.exports = router
