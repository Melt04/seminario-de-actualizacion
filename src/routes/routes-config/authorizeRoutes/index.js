const AuthorizeHandler = require('../../../handlers/authorizeHandler')
const dbHandler = require('../../../model/db/dbConnection')
const Route = require('../../class/Route')
const { getBodyFromRequest } = require('../../../utils')

const authorizeHandler = new AuthorizeHandler(dbHandler)
const userIsAuthorized = new Route(
  'POST',
  new RegExp('^/authorized/user$'),
  async (req, res) => {
    try {
      body = await getBodyFromRequest(req)
      const result = await authorizeHandler.userIsAuthorized({
        resourceId: body.resourceId,
        userId: body.userId
      })
      console.log(result)
      res.write(
        JSON.stringify({ message: `User ${result ? 'is' : 'not'} Authorized` })
      )
      res.end()
    } catch (e) {
      console.log(e)

      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed validate authorization' }))

      res.end()
    }
  }
)

const authorizeAccessToResource = new Route(
  'POST',
  new RegExp('^/authorized/resource$'),
  async (req, res) => {
    try {
      body = await getBodyFromRequest(req)

      await authorizeHandler.authorizeAccessToResource({
        resId: body.resId,
        accessId: body.accessId
      })
      res.write(JSON.stringify({ message: 'Access to Resource created' }))
      res.end()
    } catch (e) {
      console.log(e)

      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to create access' }))

      res.end()
    }
  }
)

const authorizeGroupToAccess = new Route(
  'POST',
  new RegExp('^/authorized/group$'),
  async (req, res) => {
    try {
      body = await getBodyFromRequest(req)

      const data = await authorizeHandler.authorizeGroupToAccess({
        accessId: body.accessId,
        groupId: body.groupId
      })
      res.write(JSON.stringify({ message: 'Access to group created' }))

      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(JSON.stringify({ message: 'Failed to create access' }))
      res.end()
    }
  }
)

module.exports = {
  userIsAuthorized,
  authorizeAccessToResource,
  authorizeGroupToAccess
}
