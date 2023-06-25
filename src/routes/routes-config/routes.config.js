const { RouteHandler } = require('../class/RouteHandler')
const { getAllUsers, userCreateRoute, getUserById } = require('./userRoutes')

const routesHandler = new RouteHandler([
  userCreateRoute,
  getAllUsers,
  getUserById
])

module.exports = { routesHandler }
