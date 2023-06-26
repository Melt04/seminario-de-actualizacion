class RouteHandler {
  constructor (routes = []) {
    this.routes = routes
  }
  getRoute (path, method) {
    const data = this.routes.find(route => {
      console.log(route)
      return route.path.exec(path) && route.method === method
    })
    return data
  }
  addRoute (route) {
    this.routes.push(route)
  }
}

module.exports = { RouteHandler }
