const User = require('../models/User')
const Likes = require('../models/Likes')
const Dislikes = require('../models/Dislikes')
const Comment = require('../models/Comment')
const asyncHandler = require('express-async-handler')
const ObjectID = require('mongodb').ObjectID

// @route POST /comment
// @desc Add comment to the video
// @access Private
exports.addCommentController = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { loggedInUsername, userId, videoId, comment } = req.body
  const videoObjectId = ObjectID(videoId)

  const commenter = new Comment({
    username: loggedInUsername,
    userId: loggedInUserId,
    comment: comment,
    commentDate: new Date()
  })

  const addStatus = await User.updateOne(
    {
      _id: userId,
      'videos._id': videoObjectId
    },
    {
      $push: {
        'videos.$.comments': commenter
      }
    }
  )
  if (addStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('something went wrong')
})

// @route POST /comment
// @desc Addes comment to the video
// @access Private
exports.editCommentController = asyncHandler(async (req, res, next) => {
  const { userId, videoId, comment, commentId } = req.body
  const videoObjectId = ObjectID(videoId)
  const commentObjectId = ObjectID(commentId)

  const editStatus = await User.updateOne(
    {
      _id: userId,
      'videos.comments._id': commentObjectId
    },
    {
      $set: {
        'videos.$[video].comments.$[comment].comment': comment
      }
    },
    {
      arrayFilters: [
        { 'comment._id': commentObjectId },
        { 'video._id': videoObjectId }
      ]
    }
  )
  if (editStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('something went wrong')
})

// @route POST /comment
// @desc Addes comment to the video
// @access Private
exports.deleteCommentController = asyncHandler(async (req, res, next) => {
  const { userId, videoId, commentId } = req.body
  const commentObjectId = ObjectID(commentId)
  const videoObjectId = ObjectID(videoId)
  const loggedInUserId = req.user.id

  const isUser = await User.findById(loggedInUserId)
  if (isUser) {
    const deleteStatus = await User.updateOne(
      {
        _id: userId,
        'videos.comments._id': commentObjectId
      },
      {
        $pull: {
          'videos.$[video].comments': { _id: commentObjectId }
        }
      },
      {
        arrayFilters: [{ 'video._id': videoObjectId }]
      }
    )

    if (deleteStatus.nModified === 1) {
      return res.status(200).json({ success: true })
    }
  } else {
    res.status(404)
    throw new Error('user not found')
  }
  res.status(500)
  throw new Error('something went wrong')
})

// @route POST /like
// @desc Addes like to the video
// @access Private
exports.addToCommentLikeController = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { loggedInUsername, userId, videoId, userImage, commentId } = req.body
  const videoObjectId = ObjectID(videoId)
  const commentObjectId = ObjectID(commentId)

  const like = new Likes({
    username: loggedInUsername,
    userId: loggedInUserId,
    userImage
  })

  const likeStatus = await User.updateOne(
    {
      _id: userId,
      'videos.comments._id': commentObjectId
    },
    {
      $push: {
        'videos.$[video].comments.$[comment].likes': like
      }
    },
    {
      arrayFilters: [
        { 'video._id': videoObjectId },
        { 'comment._id': commentObjectId }
      ]
    }
  )

  if (likeStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('something went wrong')
})

// @route POST /Dislike
// @desc Addes Dislike to the video
// @access Private addToDislikeController
exports.addToCommentDislikeController = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { loggedInUsername, userId, videoId, commentId } = req.body
  const videoObjectId = ObjectID(videoId)
  const commentObjectId = ObjectID(commentId)

  const dislike = new Dislikes({
    username: loggedInUsername,
    userId: loggedInUserId
  })

  const dislikeStatus = await User.updateOne(
    {
      _id: userId,
      'videos.comments._id': commentObjectId
    },
    {
      $push: {
        'videos.$[video].comments.$[comment].dislikes': dislike
      }
    },
    {
      arrayFilters: [
        { 'video._id': videoObjectId },
        { 'comment._id': commentObjectId }
      ]
    }
  )
  if (dislikeStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('something went wrong')
})

// @route POST /like
// @desc remove like from video
// @access Private
exports.removeCommentLikeController = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { userId, videoId, commentId } = req.body
  const videoObjectId = ObjectID(videoId)
  const commentObjectId = ObjectID(commentId)

  const removeLikeStatus = await User.updateOne(
    {
      _id: userId,
      'videos.comments._id': commentObjectId
    },
    {
      $pull: {
        'videos.$[video].comments.$[comment].likes': {
          userId: loggedInUserId
        }
      }
    },
    {
      arrayFilters: [
        { 'video._id': videoObjectId },
        { 'comment._id': commentObjectId }
      ]
    }
  )

  if (removeLikeStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }

  res.status(500)
  throw new Error('something went wrong')
})

// @route POST /Dislike
// @desc remove Dislike from video
// @access Private
exports.removeCommentDislikeController = asyncHandler(
  async (req, res, next) => {
    const loggedInUserId = req.user.id
    const { userId, videoId, commentId } = req.body
    const videoObjectId = ObjectID(videoId)
    const commentObjectId = ObjectID(commentId)

    const removeDislikeStaus = await User.updateOne(
      {
        _id: userId,
        'videos.comments._id': commentObjectId
      },
      {
        $pull: {
          'videos.$[video].comments.$[comment].dislikes': {
            userId: loggedInUserId
          }
        }
      },
      {
        arrayFilters: [
          { 'video._id': videoObjectId },
          { 'comment._id': commentObjectId }
        ]
      }
    )

    if (removeDislikeStaus.nModified === 1) {
      return res.status(200).json({ success: true })
    }

    res.status(500)
    throw new Error('something went wrong')
  }
)
