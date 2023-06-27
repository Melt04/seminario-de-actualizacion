const { RouteHandler } = require('../class/RouteHandler')
const { getAllUsers, userCreateRoute, getUserById } = require('./userRoutes')
const {
  getAllGroups,
  groupCreateRoute,
  gerGroupById
} = require('./groupRoutes')
const {
  accessCreateRoute,
  getAccessById,
  getAllAccess
} = require('./accessRoutes')
const {
  getAllResources,
  getResourceById,
  resourceCreateRoute
} = require('./resourcesRoutes')
const {
  addUserToGroup,
  getMembersByGroup,
  getAllMembers
} = require('./membersRoutes')
const {
  userIsAuthorized,
  authorizeAccessToResource,
  authorizeGroupToAccess
} = require('./authorizeRoutes')
const routesHandler = new RouteHandler([
  userCreateRoute,
  getAllUsers,
  getUserById,
  getAllGroups,
  groupCreateRoute,
  gerGroupById,
  accessCreateRoute,
  getAccessById,
  getAllAccess,
  getAllResources,
  getResourceById,
  resourceCreateRoute,
  addUserToGroup,
  getMembersByGroup,
  getAllMembers,
  userIsAuthorized,
  authorizeAccessToResource,
  authorizeGroupToAccess
])

module.exports = { routesHandler }
