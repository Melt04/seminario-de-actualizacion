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
      if (!body?.resourceId || !body.userId) {
        res.statusCode = 400
        res.write(JSON.stringify({ message: 'Missing Data', error: false }))
        return res.end()
      }

      const result = await authorizeHandler.userIsAuthorized({
        resourceId: body.resourceId,
        userId: body.userId
      })
      res.write(
        JSON.stringify({
          message: `User ${result ? 'is' : 'not'} Authorized`,
          error: false
        })
      )
      res.end()
    } catch (e) {
      console.log(e)

      res.statusCode = 500
      res.write(
        JSON.stringify({
          message: 'Failed validate authorization',
          error: true
        })
      )

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
      if (!body?.resId || !body.accessId) {
        res.statusCode = 400
        res.write(JSON.stringify({ message: 'Missing Data', error: true }))
        return res.end()
      }
      const result = await authorizeHandler.authorizeAccessToResource({
        resId: body.resId,
        accessId: body.accessId
      })
      if (!result) {
        throw new Error('Failed to gran access')
      }
      res.statusCode = 201
      res.write(
        JSON.stringify({ message: 'Access to Resource created', error: false })
      )
      res.end()
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.write(
        JSON.stringify({ message: 'Failed to create access', error: true })
      )

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
      if (!body?.groupId || !body.accessId) {
        res.statusCode = 400
        res.write(JSON.stringify({ message: 'Missing Data' }))
        return res.end()
      }

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
