const mongoose = require('mongoose')

const viewsSchema = new mongoose.Schema({
  username: { type: String },
  userId: { type: String }
})

const Views = mongoose.model('views', viewsSchema)
module.exports = Views
