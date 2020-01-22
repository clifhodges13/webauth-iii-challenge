const express = require("express")
const bcrypt = require("bcryptjs")
const usersModel = require("../data/usersModel")

const router = express.Router()

// REGISTER a user
router.post('/register', async (req, res, next) => {

  // if (!req.body || !req.body.username || !req.body.password) {
  //   return res.status(401).json({ message: 'You need to include a username and password in your request.' })
  // }

  try {
    const saved = await usersModel.add(req.body)
    res.status(201).json(saved)
  } catch(err) {
    console.log(err)
    next(err)
  }
})

// LOGIN a user
router.post('/login', async (req, res, next) => {
  res.send('login')
})

// GET all users
router.get('/users', async (req, res, next) => {
  try {
    const users = await usersModel.find()
    res.status(200).json(users)
  } catch(err) {
    next(err)
  }
})

router.delete('/users/:id', async (req, res, next) => {
  try {
    const deleted = await usersModel.remove(req.params.id)
    res.status(200).json(deleted)
  } catch(err) {
    next(err)
  }
})

module.exports = router