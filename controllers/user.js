const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search

  let users
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: 'i' }
    })
  }

  if (!users) {
    res.status(404)
    throw new Error('No users found in search')
  }

  res.status(200).json({ users: users })
})

// @route POST /users
// @desc get user details
// @access Private

exports.getUserDetailsController = asyncHandler(async (req, res, next) => {
  const { userId } = req.params

  const user = await User.findById(userId)
  if (user) {
    const allUserViews = await user.videos.map(video => video.views)
    let allViews = []
    for (const view of allUserViews) {
      allViews = [...allViews, ...view]
    }

    const userDetails = {
      username: user.username,
      userImage: user.userImage,
      aboutUser: user.aboutUser,
      email: user.email,
      userId,
      followers: user.followers,
      views: allViews,
      videos: user.videos.sort(
        (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
      )
    }
    return res.status(200).json(userDetails)
  }

  res.status(500)
  throw new Error('something went wrong')
})
