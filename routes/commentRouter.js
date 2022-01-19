const express = require('express')
const protect = require('../middleware/auth')
const router = express.Router()
const {
  addCommentController,
  editCommentController,
  deleteCommentController,

  addToCommentLikeController,
  addToCommentDislikeController,
  removeCommentLikeController,
  removeCommentDislikeController
} = require('../controllers/commentController')

router.route('/add-comment').post(protect, addCommentController)
router.route('/edit-comment').post(protect, editCommentController)
router.route('/delete-comment').post(protect, deleteCommentController)
router.route('/add-like').post(protect, addToCommentLikeController)
router.route('/add-dislike').post(protect, addToCommentDislikeController)
router.route('/remove-like').post(protect, removeCommentLikeController)
router.route('/remove-dislike').post(protect, removeCommentDislikeController)
module.exports = router
