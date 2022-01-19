const mongoose = require('mongoose')

const dislikesSchema = new mongoose.Schema({
  username: { type: String },
  userId: { type: String }
})

const Dislikes = mongoose.model('dislikes', dislikesSchema)
module.exports = Dislikes
