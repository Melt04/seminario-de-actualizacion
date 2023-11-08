class Route {
  constructor (method = 'GET', path, handler) {
    this.path = path
    this.handler = handler
    this.method = method
  }
}

module.exports = Route
