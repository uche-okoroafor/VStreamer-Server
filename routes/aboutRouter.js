const express = require('express')
const protect = require('../middleware/auth')
const router = express.Router()
const { updateAboutUserController } = require('../controllers/aboutController')

router.route('/update-about').post(protect, updateAboutUserController)

module.exports = router
