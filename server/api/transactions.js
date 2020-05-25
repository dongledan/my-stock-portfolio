const router = require('express').Router()
const {Transaction} = require('../db/models')
const {isUser, isAdmin, isCorrectUserOrAdmin} = require('./utils')
module.exports = router

// find transactions by user
router.get('/:id', isAdmin, async (req, res, next) => {
  try {
    const portfolio = await Transaction.findAll()
    res.json(portfolio)
  } catch (err) {
    next(err)
  }
})

// add stock
router.post('/', async (req, res, next) => {
  try {
    const ticker = req.body.ticker
    const shares = req.body.shares
    const userId = req.body.id
    const addStock = await Portfolio.create({ticker, shares, userId})
    res.json(addStock)
  } catch (error) {
    next(error)
  }
})
