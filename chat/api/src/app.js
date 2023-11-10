const dotenv = require("dotenv");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const dbHandler = require("./model/db/dbConnection");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_SCHEMA, SERVER_PORT } = process.env;

const { ServerHandler } = require("./server");
const { SessionHandler } = require("./handlers/sessionHandler");
const sessionHandler = new SessionHandler(dbHandler);
const server = new ServerHandler(sessionHandler);

dbHandler
  .connect(DB_HOST, "3306", DB_USER, DB_PASSWORD, DB_SCHEMA)
  .then(() => {
    server.start(SERVER_PORT || 3000);
  })
  .catch((e) => {
    console.log("FAILED TO START DB/SERVER");
    console.log(e);
  });
