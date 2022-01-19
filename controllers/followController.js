const User = require('../models/User')
const Followers = require('../models/Followers')
const asyncHandler = require('express-async-handler')

// @route POST /follower
// @desc Add follower to the video
// @access Private
exports.addFollowerController = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { loggedInUsername, userId } = req.body
  const follower = new Followers({
    username: loggedInUsername,
    userId: loggedInUserId
  })

  const addStatus = await User.updateOne(
    {
      _id: userId
    },
    {
      $push: {
        followers: follower
      }
    }
  )
  if (addStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('something went wrong')
})



// @route POST /follower
// @desc remove follower to the video
// @access Private

exports.removeFollowerController = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { userId } = req.body

  const addStatus = await User.updateOne(
    {
      _id: userId
    },
    {
      $pull: {
        followers: { userId: loggedInUserId }
      }
    }
  )
  if (addStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('something went wrong')
})
