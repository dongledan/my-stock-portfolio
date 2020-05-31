const router = require('express').Router()
const {User} = require('../db/models')
const {isUser, isAdmin, isCorrectUserOrAdmin} = require('./utils')
module.exports = router

// Get all users only if user is an admin
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'name', 'balance']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get individual user
router.get('/:id', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// delete user only if correct user or admin
router.delete('/', isCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const destroyedUser = await User.destroy(req.body)
    res.json(destroyedUser)
  } catch (error) {
    next(error)
  }
})
