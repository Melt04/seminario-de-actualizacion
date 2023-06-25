const UserHandler = require('../../../handlers/userHandler')
const dbHandler = require('../../../model/db/dbConnection')
const Route = require('../../class/Route')
const { getBodyFromRequest } = require('../../../utils')

const userHandler = new UserHandler(dbHandler)

const userCreateRoute = new Route(
  'POST',
  new RegExp('^/users$'),
  async (req, res) => {
    try {
      body = await getBodyFromRequest(req)
      await userHandler.create({ name: body.name, last_name: body.last_name })
      res.write(JSON.stringify({ message: 'Created Successfully' }))
      res.end()
    } catch (e) {
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to create user' }))

      res.end()
    }
  }
)
const getAllUsers = new Route(
  'GET',
  new RegExp('^/users$'),
  async (req, res) => {
    try {
      const data = await userHandler.getAllUsers()
      res.write(JSON.stringify(data))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to get all users' }))
      res.end()
    }
  }
)
const getUserById = new Route(
  'GET',
  new RegExp('^/users/\\d+$'),
  async (req, res) => {
    try {
      const index = req.url.lastIndexOf('/')
      const id = req.url.slice(index + 1)
      const data = await userHandler.getIdById(id)
      res.write(JSON.stringify(data))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to get all users' }))
      res.end()
    }
  }
)

module.exports = {
  getAllUsers,
  userCreateRoute,
  getUserById
}
