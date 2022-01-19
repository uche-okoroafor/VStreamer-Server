const User = require('../models/User')
const Video = require('../models/Videos')
const fs = require('fs')
const cloud = require('../config/cloudinaryConfig')

exports.uploadVideoDetailsController = async (req, res) => {
  const {
    username,
    videoTitle,
    userId,
    videoSource,
    videoDescription,
    videoDuration,
    artist,
    videoCategory
  } = req.body
  const video = new Video({
    username,
    username,
    userId,
    videoTitle,
    videoSource,
    videoDescription,
    videoDuration,
    artist,
    videoCategory,
    datePosted: Date.now(),
    likes: [],
    dislikes: [],
    views: [],
    comments: []
  })

  const videoUpdateStatus = await User.updateOne(
    { _id: userId },
    {
      $push: {
        videos: [video]
      }
    }
  )
  if (videoUpdateStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('something went wrong')
}

exports.uploadVideoController = async (req, res) => {
  const uploadVideo = await cloud.uploads(req)
  if (uploadVideo) {
    return res.status(200).send(uploadVideo)
  }
  res.status(500)
  throw new Error('something went wrong')
}
