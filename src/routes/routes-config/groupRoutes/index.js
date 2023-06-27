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
      if (!body?.name) {
        res.statusCode = 400
        res.write(JSON.stringify({ message: 'Missing Data', error: true }))
        return res.end()
      }
      const group = new Group({ name: body.name })
      await groupHandler.create(group)
      res.statusCode = 201
      res.write(
        JSON.stringify({ message: 'Created Successfully', error: false })
      )
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(
        JSON.stringify({ message: 'Failed to create group', error: false })
      )
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
      res.write(JSON.stringify({ data, error: false }))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(
        JSON.stringify({ message: 'Failed to get all group', error: true })
      )
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
      const data = await groupHandler.getGroupById(id)
      res.write(JSON.stringify({ data, error: false }))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(
        JSON.stringify({ message: 'Failed to get  group', error: true })
      )
      res.end()
    }
  }
)

module.exports = {
  groupCreateRoute,
  getAllGroups,
  gerGroupById
}
