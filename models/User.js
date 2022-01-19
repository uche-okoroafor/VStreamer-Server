const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  views: { type: Schema.Types.Array, ref: 'views' },

  register_date: {
    type: Date,
    default: Date.now
  },
  aboutUser: {
    type: String
  },
  userImage: { type: String },
  videos: { type: Schema.Types.Array, ref: 'videos' },
  followers: { type: Schema.Types.Array, ref: 'followers' }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = User = mongoose.model('user', userSchema)
