const { RouteHandler } = require("../class/RouteHandler");
const { getAllUsers, userCreateRoute, getUserById, loginUserRoute, logOutUserRoute } = require("./userRoutes");
const { accessCreateRoute, getAccessById, getAllAccess } = require("./accessRoutes");
const { getAllResources, getResourceById, resourceCreateRoute } = require("./resourcesRoutes");
const { userIsAuthorized, authorizeAccessToResource, authorizeGroupToAccess, authenticateRoute } = require("./authorizeRoutes");
const routesHandler = new RouteHandler([loginUserRoute, getAllUsers, authenticateRoute, logOutUserRoute, userIsAuthorized, authorizeAccessToResource, authorizeGroupToAccess]);

module.exports = { routesHandler };
