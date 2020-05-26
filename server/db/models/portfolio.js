const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
  ticker: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Portfolio
