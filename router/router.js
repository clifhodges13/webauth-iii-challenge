const express = require("express")
const bcrypt = require("bcryptjs")
const usersModel = require("../data/usersModel")

const router = express.Router()

// REGISTER a user
router.post('/register', async (req, res, next) => {
  const user = req.body

  if (!user || !user.username || !user.password) {
    return res.status(401).json({ message: 'You need to include a username and password in your request.' })
  }

  try {
    const saved = await usersModel.add(user)
    res.status(201).json(saved)
  } catch(err) {
    console.log(err)
    next(err)
  }
})

// LOGIN a user
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await usersModel.findBy({ username }).first()

    const validPassword = await bcrypt.compare(password, user.password)

    if(user && validPassword) {
      res.status(200).json({ message: `Welcome ${user.username}!`})
    } else {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

  } catch(err) {
    console.log(err)
    next(err)
  }
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

// DELETE a user by id
router.delete('/users/:id', async (req, res, next) => {
  try {
    const deleted = await usersModel.remove(req.params.id)
    res.status(200).json(deleted)
  } catch(err) {
    next(err)
  }
})

module.exports = router