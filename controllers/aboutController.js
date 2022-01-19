const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @route POST /follower
// @desc Add follower to the video
// @access Private
exports.updateAboutUserController = asyncHandler(async (req, res, next) => {
  const userId = req.user.id
  const { aboutUser } = req.body

  const updateStatus = await User.updateOne(
    {
      _id: userId
    },
    {
      $set: {
        aboutUser: aboutUser
      }
    }
  )
  if (updateStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('something went wrong')
})
