const AccessHandler = require('../../../handlers/accessHandler')
const dbHandler = require('../../../model/db/dbConnection')
const Route = require('../../class/Route')
const { getBodyFromRequest } = require('../../../utils')
const Access = require('../../../model/entities/access')

const accessHandler = new AccessHandler(dbHandler)

const accessCreateRoute = new Route(
  'POST',
  new RegExp('^/access$'),
  async (req, res) => {
    try {
      body = await getBodyFromRequest(req)
      if (!body?.name) {
        res.statusCode = 400
        res.write(JSON.stringify({ message: 'Missing data', error: true }))
        return res.end()
      }
      const access = new Access({ name: body.name })
      const result = await accessHandler.create(access)
      if (!result) {
        throw new Error('Failed to create access')
      }
      res.statusCode = 201
      res.write(
        JSON.stringify({ message: 'Created Successfully', error: false })
      )
      return res.end()
    } catch (e) {
      res.statusCode = 500
      res.write(
        JSON.stringify({ message: 'Failed to create access', error: true })
      )
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
      res.write(JSON.stringify({ data, error: false }))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(
        JSON.stringify({ message: 'Failed to get all access', error: false })
      )
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
      const data = await accessHandler.getAccessById(id)
      res.write(JSON.stringify({ data, error: false }))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(
        JSON.stringify({ message: 'Failed to get all access', error: true })
      )
      res.end()
    }
  }
)

module.exports = {
  getAccessById,
  getAllAccess,
  accessCreateRoute
}
