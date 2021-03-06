// start()
// function start () {
//  'use strict'

  const mongoose = require('mongoose')
  const bcrypt = require('bcryptjs')

  let  UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  })

  UserSchema.methods.validatePassword = (password, callback) => {
    bcrypt.compare(password, this.password, (err, isValid) => {
      if (err) {
        callback(err)
        return
      }
      callback(null, isValid)
    })
  }

  const User = mongoose.model('User', UserSchema)

  module.exports = User
// }
