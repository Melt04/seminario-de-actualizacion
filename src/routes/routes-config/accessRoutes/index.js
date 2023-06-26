const AccessHandler = require('../../../handlers/accessHandler')
const dbHandler = require('../../../model/db/dbConnection')
const Route = require('../../class/Route')
const { getBodyFromRequest } = require('../../../utils')

const accessHandler = new AccessHandler(dbHandler)

const accessCreateRoute = new Route(
  'POST',
  new RegExp('^/access$'),
  async (req, res) => {
    try {
      body = await getBodyFromRequest(req)
      await accessHandler.create({ name: body.name })
      res.write(JSON.stringify({ message: 'Created Successfully' }))
      res.end()
    } catch (e) {
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to create access' }))

      res.end()
    }
  }
)
const getAllAccess = new Route(
  'GET',
  new RegExp('^/access$'),
  async (req, res) => {
    try {
      const data = await accessHandler.getAllAccess()
      res.write(JSON.stringify(data))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to get all access' }))
      res.end()
    }
  }
)
const getAccessById = new Route(
  'GET',
  new RegExp('^/access/\\d+$'),
  async (req, res) => {
    try {
      const index = req.url.lastIndexOf('/')
      const id = req.url.slice(index + 1)
      const data = await accessHandler.getIdById(id)
      res.write(JSON.stringify(data))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to get all access' }))
      res.end()
    }
  }
)

module.exports = {
  getAccessById,
  getAllAccess,
  accessCreateRoute
}
