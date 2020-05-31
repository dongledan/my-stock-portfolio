const router = require('express').Router()
const {Portfolio} = require('../db/models')
const {isUser, isAdmin, isCorrectUserOrAdmin} = require('./utils')
module.exports = router

// find portfolio by userId
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const portfolio = await Portfolio.findAll({
      where: {
        userId
      }
    })
    res.json(portfolio)
  } catch (err) {
    next(err)
  }
})

// find all portfolios only if admin
router.get('/all', isAdmin, async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findAll()
    res.json(portfolio)
  } catch (err) {
    next(err)
  }
})

// check to see if stock exists, if not create new
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const {ticker, shares} = req.body
    let stock = await Portfolio.findStock(userId, ticker)
    if (stock) {
      await stock.increment(['shares'], {by: shares})
    } else {
      stock = await Portfolio.newStock(userId, ticker, shares)
    }
    res.json(stock)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await Portfolio.update(
      {
        shares: this.shares + req.params.shares
      },
      {
        where: {
          userId: req.params.id,
          ticker: req.params.ticker
        }
      }
    )
    res.sendStatus(204)
  } catch (error) {}
})
