class Route {
  constructor(method = "GET", path, handler, validate = true) {
    this.path = path;
    this.handler = handler;
    this.method = method;
    this.validate = validate;
  }
}

module.exports = Route;
