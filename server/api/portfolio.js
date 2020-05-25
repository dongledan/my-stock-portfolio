const router = require('express').Router()
const {Portfolio, Transaction} = require('../db/models')
const {isUser, isAdmin, isCorrectUserOrAdmin} = require('./utils')
module.exports = router

// find all portfolios
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findAll()
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

// add transaction -- trx = transaction abbreviation
router.post('/trx', async (req, res, next) => {
  try {
    const ticker = req.body.ticker
    const shares = req.body.shares
    const price = req.body.price
    const addStock = await Transaction.create({ticker, shares, price})
    res.json(addStock)
  } catch (error) {
    next(error)
  }
})
