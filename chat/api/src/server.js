const http = require("http");
const { RouteHandler } = require("./routes/class/RouteHandler");

const { ExecuteRoute } = require("./routes/class/ExecuteRoute");
const { routesHandler } = require("./routes/routes-config/routes.config");

class ServerHandler {
  constructor(db) {
    this.db = db;
  }
  start(port) {
    const server = http.createServer(async (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.setHeader("Access-Control-Allow-Credentials", true);
      res.setHeader("Access-Control-Expose-Headers", "x-user-id");
      if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
      }
      const routeFounded = routesHandler.getRoute(req.url, req.method);
      if (!routeFounded.validate) {
        const sessionToken = req.headers["x-session-token"];
        if (!sessionToken) {
          res.writeHead(403);
          res.write(JSON.stringify({ message: "Missing token", error: true }));
          return res.end();
        }
        const found = await this.validateUserToken(sessionToken);
        if (found.length <= 0) {
          res.writeHead(403);
          res.write(JSON.stringify({ message: "invalid token", error: true }));
          return res.end();
        }

        req.userId = found[0].id;
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
  async validateUserToken(userid) {
    try {
      const data = await this.db.query(`CALL selectUserById (${userid})`);
      return data[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = { ServerHandler };
