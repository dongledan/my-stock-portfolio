const router = require('express').Router()
const {Transaction} = require('../db/models')
const {isUser, isAdmin, isCorrectUserOrAdmin} = require('./utils')
module.exports = router

// find transactions by user
router.get('/:id', async (req, res, next) => {
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

// add transactions
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const {purchaseDate, price, shares, action, ticker} = req.body
    await Transaction.create(
      {
        purchaseDate,
        price,
        shares,
        action,
        ticker
      },
      {
        where: {
          userId
        }
      }
    )

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})
