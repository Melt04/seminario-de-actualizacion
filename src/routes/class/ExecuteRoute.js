class ExecuteRoute {
  static execute (req, res) {
    return route => {
      route.handler(req, res)
    }
  }
}

module.exports = { ExecuteRoute }
