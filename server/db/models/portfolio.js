const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Portfolio.findStock = async function(userId, ticker) {
  try {
    const portfolio = await this.findOne({
      where: {
        userId,
        ticker
      }
    })
    return portfolio
  } catch (error) {
    console.error(error)
  }
}

Portfolio.newStock = async function(userId, ticker, shares) {
  try {
    await Portfolio.create({
      userId,
      ticker,
      shares
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = Portfolio
