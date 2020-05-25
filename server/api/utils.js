const {User} = require('../db/models')

async function isUser(req, res, next) {
  console.log(req.body)
  try {
    const user = await User.findbyPk(req.body.user.id)
    if (user) {
      next()
    }
    res.send('not a User')
  } catch (error) {
    next(error)
  }
}

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.send('not an admin')
  }
}

function isCorrectUserOrAdmin(req, res, next) {
  let id = parseInt(req.params.userId)
  if (req.user && (req.user.isAdmin || req.user.id === id)) {
    next()
  } else {
    res.send('Not correct user or admin')
  }
}

module.exports = {
  isUser,
  isAdmin,
  isCorrectUserOrAdmin
}
