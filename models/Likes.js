const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
  username: { type: String },
  userId: { type: String },
  userImage: { type: String }
})

const Likes = mongoose.model('likes', likesSchema)
module.exports = Likes
