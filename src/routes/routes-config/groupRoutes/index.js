const GroupHandler = require('../../../handlers/groupHandler')
const dbHandler = require('../../../model/db/dbConnection')
const Route = require('../../class/Route')
const { getBodyFromRequest } = require('../../../utils')
const Group = require('../../../model/entities/groups')

const groupHandler = new GroupHandler(dbHandler)

const groupCreateRoute = new Route(
  'POST',
  new RegExp('^/groups$'),
  async (req, res) => {
    try {
      body = await getBodyFromRequest(req)
      const group = new Group({ name: body.name })
      await groupHandler.create(group)
      res.write(JSON.stringify({ message: 'Created Successfully' }))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to create group' }))

      res.end()
    }
  }
)
const getAllGroups = new Route(
  'GET',
  new RegExp('^/groups$'),
  async (req, res) => {
    try {
      const data = await groupHandler.getAllGroups()
      res.write(JSON.stringify(data))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to get all group' }))
      res.end()
    }
  }
)
const gerGroupById = new Route(
  'GET',
  new RegExp('^/groups/\\d+$'),
  async (req, res) => {
    try {
      const index = req.url.lastIndexOf('/')
      const id = req.url.slice(index + 1)
      const data = await groupHandler.getIdById(id)
      res.write(JSON.stringify(data))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to get all group' }))
      res.end()
    }
  }
)

module.exports = {
  groupCreateRoute,
  getAllGroups,
  gerGroupById
}
