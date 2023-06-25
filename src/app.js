const dotenv = require('dotenv')

const result = dotenv.config()
if (result.error) {
  throw result.error
}
const dbHandler = require('./model/db/dbConnection')
const { DB_HOST, DB_USER, DB_PASSWORD, DB_SCHEMA } = process.env

const { ServerHandler } = require('./server')

dbHandler
  .connect(DB_HOST, '3306', DB_USER, DB_PASSWORD, DB_SCHEMA)
  .then(() => {
    ServerHandler.start(3000)
  })
  .catch(e => {
    console.log('FAILED TO START DB/SERVER')
    console.log(e)
  })
