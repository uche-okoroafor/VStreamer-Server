const fs = require('fs')
const multer = require('multer')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFileStream } = require('../middleware/s3')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')



// @route POST /image
// @desc upload image
// @access Private

exports.uploadImageController = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const file = req.file

  const cloudResponse = await uploadFile(file)
  if (cloudResponse) {
    await unlinkFile(file.path)
    const image = await User.updateOne(
      { _id: userId },
      {
        $set: {
          userImage: cloudResponse.Key
        }
      }
    )
    if (image.nModified === 1) {
      return res.status(200).send({ success: true })
    }
  }
  res.status(500)
  throw new Error('something went wrong')
})

exports.downloadImageController = asyncHandler(async (req, res) => {
  const { key } = req.params

  if (!key) {
    return res.status(400).send({ error: 'key is not defined' })
  }
  const readStream = getFileStream(key)
  if (readStream) {
    return readStream.pipe(res)
  }
  throw new Error('something went wrong')
})

exports.getUserImageKeyController = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const user = await User.findById(userId)
  if (user) {
    const key = user.userImage
    if (!key) {
      return res.status(200).send({ key: undefined })
    } else {
      const readStream = getFileStream(key)
      if (readStream) {
        return readStream.pipe(res)
      }
    }
  } else {
    throw new Error('user does not exist')
  }
})

exports.deleteImageController = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const deleteImage = await User.updateOne(
    { _id: userId },
    {
      $set: {
        userImage: ''
      }
    }
  )
  if (deleteImage.nModified === 1) {
    return res.status(200).send({ success: true })
  }

  res.status(500)
  throw new Error('something went wrong')
})
