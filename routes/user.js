const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const { searchUsers, getUserDetailsController } = require('../controllers/user')

router.route('/').get(protect, searchUsers)
router.route('/get-details/:userId').get(protect, getUserDetailsController)

module.exports = router
