const http = require("http");
const { RouteHandler } = require("./routes/class/RouteHandler");

const { ExecuteRoute } = require("./routes/class/ExecuteRoute");
const { routesHandler } = require("./routes/routes-config/routes.config");

class ServerHandler {
  static start(port) {
    const server = http.createServer((req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Credentials", true);
      const routeFounded = routesHandler.getRoute(req.url, req.method);
      if (routeFounded) {
        ExecuteRoute.execute(req, res)(routeFounded);
      } else {
        res.statusCode = 404;
        res.write(
          JSON.stringify({
            message: "Not found",
          })
        );
        res.end();
      }
    });
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

module.exports = { ServerHandler };
