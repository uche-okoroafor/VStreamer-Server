const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new mongoose.Schema({
  username: { type: String },
  comment: { type: String },
  commentId: { type: String },
  commentDate: { type: Date },
  userImage: { type: String },
  userId: { type: String },
  likes: { type: Schema.Types.Array, ref: 'likes' },
  dislikes: { type: Schema.Types.Array, ref: 'dislikes' }
})

const comments = mongoose.model('comments', commentsSchema)
module.exports = comments
