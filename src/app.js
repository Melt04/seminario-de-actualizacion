const dotenv = require('dotenv')

const result = dotenv.config()

if (result.error) {
  throw result.error
}

const UserHandler = require('./handlers/userHandler')
const UserRepo = require('./repository/users/userRepository')
const { DataBaseHandler } = require('./model/db/dbConnection')
const { DB_HOST, DB_USER, DB_PASSWORD, DB_SCHEMA } = process.env

const userRepository = new UserRepo()
const dbHandler = new DataBaseHandler(
  DB_HOST,
  '3306',
  DB_USER,
  DB_PASSWORD,
  DB_SCHEMA
)
/* host, port, user, password, db */

dbHandler
  .connect()
  .then(d => console.log('2'))
  .catch(e => console.log(e))
const userHandler = new UserHandler(userRepository)
dbHandler
  .query('CALL selectAllUsers')
  .then(d => console.log(d[0][0].name))
  .catch(e => console.log(e))
/* userHandler.create({ name: 'Pepe', lastName: 'Perez', groupId: 10, status: 1 })
console.log(userHandler.update(0, { name: 'popi', status: 2 }))
console.log(userRepository.getUser(0)) */
