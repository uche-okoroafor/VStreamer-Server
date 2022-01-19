const User = require('../models/User')
const Likes = require('../models/Likes')
const Dislikes = require('../models/Dislikes')
const ObjectID = require('mongodb').ObjectID

const asyncHandler = require('express-async-handler')

// @route POST /like
// @desc Addes like to the video
// @access Private
exports.addToLikeController = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { loggedInUsername, userId, videoId, userImage } = req.body
  const videoObjectId = ObjectID(videoId)

  const like = new Likes({
    username: loggedInUsername,
    userId: loggedInUserId,
    userImage
  })

  const likeStatus = await User.updateOne(
    {
      _id: userId,
      'videos._id': videoObjectId
    },
    {
      $push: {
        'videos.$.likes': like
      }
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
exports.addToDislikeController = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { loggedInUsername, userId, videoId } = req.body
  const videoObjectId = ObjectID(videoId)

  const dislike = new Dislikes({
    username: loggedInUsername,
    userId: loggedInUserId
  })

  const dislikeStatus = await User.updateOne(
    {
      _id: userId,
      'videos._id': videoObjectId
    },
    {
      $push: {
        'videos.$.dislikes': dislike
      }
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
exports.removeLikeController = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { userId, videoId } = req.body
  const videoObjectId = ObjectID(videoId)

  const removeLikeStatus = await User.updateOne(
    {
      _id: userId,
      'videos.likes.userId': loggedInUserId
    },
    {
      $pull: {
        'videos.$[video].likes': { userId: loggedInUserId }
      }
    },
    {
      arrayFilters: [{ 'video._id': videoObjectId }]
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
exports.removeDislikeController = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { userId, videoId } = req.body
  const videoObjectId = ObjectID(videoId)

  const removeDislikeStaus = await User.updateOne(
    {
      _id: userId,
      'videos.dislikes.userId': loggedInUserId
    },
    {
      $pull: {
        'videos.$[video].dislikes': { userId: loggedInUserId }
      }
    },
    {
      arrayFilters: [{ 'video._id': videoObjectId }]
    }
  )

  if (removeDislikeStaus.nModified === 1) {
    return res.status(200).json({ success: true })
  }

  res.status(500)
  throw new Error('something went wrong')
})
