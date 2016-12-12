start()
function start () {
  'use strict'

  const express = require('express')
  const bodyParser = require('body-parser')
  const mongoose = require('mongoose')
  const User = require('./user-model')
  const bcrypt = require('bcryptjs')

  const app = express()

  const jsonParser = bodyParser.json()

  app.post('/users', jsonParser, (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message: 'No request body'
      })
    }

    if (!('username' in req.body)) {
      return res.status(422).json({
        message: 'Missing field: username'
      })
    }

    let username = req.body.username

    if (typeof username !== 'string') {
      return res.status(422).json({
        message: 'Incorrect field type: username'
      })
    }

    username = username.trim()

    if (username === '') {
      return res.status(422).json({
        message: 'Incorrect field length: username'
      })
    }

    if (!('password' in req.body)) {
      return res.status(422).json({
        message: 'Missing field: password'
      })
    }

    let password = req.body.password

    if (typeof password !== 'string') {
      return res.status(422).json({
        message: 'Incorrect field length: password'
      })
    }

    password = password.trim()

    if (password === '') {
      return res.status(422).json({
        message: 'Incorrect field length: password'
      })
    }

    bcrypt.genSalt(11, (err, salt) => {
      if (err) {
        return res.status(500).json({
          message: 'Internal server error'
        })
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: 'Internal server error'
          })
        }

        const user = new User({
          username: username,
          password: hash
        })

        user.save((err) => {
          if (err) {
            return res.status(500).json({
              message: 'Internal server error'
            })
          }

          return res.status(201).json({})
        })
      })
    })

  mongoose.connect('mongod://localhost/auth').then(() => {
    app.listen(process.env.PORT || 8080)
  })
}
