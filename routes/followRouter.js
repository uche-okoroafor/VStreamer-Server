const express = require('express')
const protect = require('../middleware/auth')
const router = express.Router()
const {
  addFollowerController,
  removeFollowerController
} = require('../controllers/followController')

router.route('/add-follower').post(protect, addFollowerController)
router.route('/remove-follower').post(protect, removeFollowerController)

module.exports = router
