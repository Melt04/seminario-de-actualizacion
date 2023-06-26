const MembersHandler = require('../../../handlers/membersHandler')
const dbHandler = require('../../../model/db/dbConnection')
const Route = require('../../class/Route')
const { getBodyFromRequest } = require('../../../utils')
const membersHandler = new MembersHandler(dbHandler)

const addUserToGroup = new Route(
  'POST',
  new RegExp('^/members$'),
  async (req, res) => {
    try {
      body = await getBodyFromRequest(req)
      await membersHandler.addUserToGroup({
        idUser: body.idUser,
        idGroup: body.idGroup
      })
      res.write(JSON.stringify({ message: 'Added Successfully' }))
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to add to  group' }))

      res.end()
    }
  }
)
const getAllMembers = new Route(
  'GET',
  new RegExp('^/members$'),
  async (req, res) => {
    try {
      const data = await membersHandler.selectAllMembers()
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
const getMembersByGroup = new Route(
  'GET',
  new RegExp('^/members/\\d+$'),
  async (req, res) => {
    try {
      const index = req.url.lastIndexOf('/')
      const id = req.url.slice(index + 1)
      const data = await membersHandler.selectMembersByGroup(id)
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
  addUserToGroup,
  getMembersByGroup,
  getAllMembers
}
