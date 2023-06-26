const ResourceHandler = require('../../../handlers/resourceHandler')
const dbHandler = require('../../../model/db/dbConnection')
const Route = require('../../class/Route')
const { getBodyFromRequest } = require('../../../utils')
const Resource = require('../../../model/entities/resource')
const resourceHandler = new ResourceHandler(dbHandler)

const resourceCreateRoute = new Route(
  'POST',
  new RegExp('^/resources$'),
  async (req, res) => {
    try {
      body = await getBodyFromRequest(req)
      const resource = new Resource({ name: body.name, type: body.type })
      await resourceHandler.create(resource)
      res.write(JSON.stringify({ message: 'Created Successfully' }))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to create resource' }))

      res.end()
    }
  }
)
const getAllResources = new Route(
  'GET',
  new RegExp('^/resources$'),
  async (req, res) => {
    try {
      const data = await resourceHandler.getAllResources()
      res.write(JSON.stringify(data))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to get all resource' }))
      res.end()
    }
  }
)
const getResourceById = new Route(
  'GET',
  new RegExp('^/resources/\\d+$'),
  async (req, res) => {
    try {
      const index = req.url.lastIndexOf('/')
      const id = req.url.slice(index + 1)
      const data = await resourceHandler.getResourceById(id)
      res.write(JSON.stringify(data))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to get all resource' }))
      res.end()
    }
  }
)

module.exports = {
  getAllResources,
  getResourceById,
  resourceCreateRoute
}
