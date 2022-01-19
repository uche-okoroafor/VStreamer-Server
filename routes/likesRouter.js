const express = require('express')
const protect = require('../middleware/auth')
const router = express.Router()
const {
  addToLikeController,
  addToDislikeController,
  removeLikeController,
  removeDislikeController
} = require('../controllers/likesController')

router.route('/add-like').post(protect, addToLikeController)
router.route('/add-dislike').post(protect, addToDislikeController)
router.route('/remove-like').post(protect, removeLikeController)
router.route('/remove-dislike').post(protect, removeDislikeController)

module.exports = router
