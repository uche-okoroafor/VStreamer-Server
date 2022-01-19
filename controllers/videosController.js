const User = require('../models/User.js')
const asyncHandler = require('express-async-handler')
const ObjectID = require('mongodb').ObjectID

// @route POST /videos
// @desc get all videos
// @access Private

exports.getAllVideosController = asyncHandler(async (req, res) => {
  try {
    const response = await User.find({}, { videos: 1, _id: 0 })
    let allVideos = []
    response.forEach(videoArray => {
      allVideos = [...allVideos, ...videoArray.videos]
    })
    allVideos = await allVideos.sort(
      (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
    )
    res.status(200).json(allVideos)
  } catch (err) {
    res.status(404).json(err)
  }
})

// @route POST /videos
// @desc get all user videos
// @access Private

exports.getUserVideosController = asyncHandler(async (req, res) => {
  const { userId } = req.body
  if (!userId) {
    return res.status(404).json({ err: 'userId is undefined' })
  }
  try {
    const userVideos = await User.find({ _id: userId }, { videos: 1, _id: 0 })
    res
      .status(200)
      .json(
        userVideos.sort(
          (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
        )
      )
  } catch (err) {
    res.status(404).json({ err: err.message })
  }
})

// @route POST /videos
// @desc deletes videos
// @access Private

exports.deleteVideoController = asyncHandler(async (req, res) => {
  const { videoId } = req.body
  const userId = req.user.id
  const videoObjectId = ObjectID(videoId)
  try {
    const isUser = await User.findById(userId)
    if (isUser) {
      const userVideos = await User.updateOne(
        { _id: userId },
        {
          $pull: {
            videos: { _id: videoObjectId }
          }
        },
        { multi: true }
      )
      if (userVideos.nModified === 1) {
        return res.status(200).json({ success: true })
      }
    }
  } catch (err) {
    res.status(404).json({ err: err.message })
  }
})
