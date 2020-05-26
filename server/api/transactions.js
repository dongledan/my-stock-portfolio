const router = require('express').Router()
const {Transaction} = require('../db/models')
const {isUser, isAdmin, isCorrectUserOrAdmin} = require('./utils')
module.exports = router

// find transactions by user
router.get('/history', async (req, res, next) => {
  try {
    const userId = req.user.id
    const transactions = await Transaction.findAll({
      where: {
        userId
      }
    })
    res.json(transactions)
  } catch (err) {
    next(err)
  }
})

// create new stock purchase
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const {purchaseDate, price, shares, action, ticker} = req.body
    const data = await Transaction.create({
      userId,
      purchaseDate,
      price,
      shares,
      action,
      ticker
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})
