const User = require('./user')
const Transaction = require('./transaction')
const Portfolio = require('./portfolio')

Portfolio.belongsTo(User)
Transaction.belongsTo(User)

User.hasOne(Portfolio)
User.hasMany(Transaction)

module.exports = {
  User,
  Transaction,
  Portfolio
}
