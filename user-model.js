start()
function start () {
  'use strict'

  const mongoose = require('mongoose')
  const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      String,
      required: true
    }
  })

  const User = mongoose.model('User', UserSchema)

  module.exports = User
}
