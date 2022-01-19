const mongoose = require('mongoose')

const followersSchema = new mongoose.Schema({
  username: { type: String },
  userId: { type: String }
})

const Followers = mongoose.model('followers', followersSchema)
module.exports = Followers
