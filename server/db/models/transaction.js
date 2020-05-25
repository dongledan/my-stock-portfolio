const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  purchaseDate: {
    type: Sequelize.DATE
  },
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  action: {
    type: Sequelize.STRING,
    defaultValue: 'BUY',
    allowNull: false
  }
})

module.exports = Transaction
