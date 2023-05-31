const dotenv = require('dotenv')
const UserHandler = require('./handlers/userHandler')
const UserRepo = require('./repository/users/userRepository')

require('dotenv').config()

const userRepository = new UserRepo()
const userHandler = new UserHandler(userRepository)
userHandler.create({ name: 'Pepe', lastName: 'Perez', groupId: 10, status: 1 })
console.log(userHandler.update(0, { name: 'popi', status: 2 }))
console.log(userRepository.getUser(0))
