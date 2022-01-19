const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videosSchema = new mongoose.Schema({
  videoSource: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  userId: {
    type: String,
    required: false
  },
  datePosted: {
    type: Date,
    required: false
  },
  videoTitle: {
    type: String,
    required: false,
    lowercase: true
  },
  views: {
    type: String,
    required: false
  },
  videoId: {
    type: String,
    required: false
  },
  videoDuration: {
    type: String,
    required: false
  },
  videoDescription: {
    type: String,
    required: false
  },
  artist: {
    type: String,
    required: false
  },
  videoCategory: {
    type: String,
    required: false
  },
  comments: { type: Schema.Types.Array, ref: 'comments' },
  likes: { type: Schema.Types.Array, ref: 'likes' },
  dislikes: { type: Schema.Types.Array, ref: 'dislikes' },
  views: { type: Schema.Types.Array, ref: 'views' }
})

const Videos = mongoose.model('Videos', videosSchema)
module.exports = Videos
