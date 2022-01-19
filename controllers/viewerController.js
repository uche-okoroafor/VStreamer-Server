const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const Views = require('../models/Views')
const ObjectID = require('mongodb').ObjectID

// @route POST /like
// @desc Addes like to the video
// @access Private
exports.addViewerController = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { loggedInUsername, userId, videoId } = req.body
  const videoObjectId = ObjectID(videoId)

  const views = new Views({
    username: loggedInUsername,
    userId: loggedInUserId
  })

  const addVideoViews = await User.updateOne(
    {
      _id: userId,
      'videos._id': videoObjectId
    },
    {
      $push: {
        'videos.$.views': views
      }
    }
  )
  if (addVideoViews.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('something went wrong')
})
