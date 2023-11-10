const http = require("http");
const { RouteHandler } = require("./routes/class/RouteHandler");

const { ExecuteRoute } = require("./routes/class/ExecuteRoute");
const { routesHandler } = require("./routes/routes-config/routes.config");

class ServerHandler {
  constructor(sessionHandler) {
    this.sessionHandler = sessionHandler;
  }
  start(port) {
    const server = http.createServer(async (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.setHeader("Access-Control-Allow-Credentials", true);
      res.setHeader("Access-Control-Expose-Headers", "x-session-token");
      if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
      }
      const routeFounded = routesHandler.getRoute(req.url, req.method);
      if (routeFounded && routeFounded.validate) {
        const sessionToken = req.headers["x-session-token"];
        try {
          const sessionResponse = await this.sessionHandler.validateSession(sessionToken);
          if (sessionResponse.error) {
            res.writeHead(403);
            res.write(JSON.stringify({ message: sessionResponse.message, error: true }));
            return res.end();
          }
          req.userId = sessionResponse.userId;
        } catch (e) {
          res.writeHead(403);
          res.write(JSON.stringify({ message: "Invalid Token", error: true }));
          return res.end();
        }
      }

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
