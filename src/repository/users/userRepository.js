const User = require('../../model/entities/users')

class UserRepository {
  constructor () {
    this.users = []
  }
  createUser (userData) {
    const user = new User(userData)
    const id = this.users.length
    user.setId(id)
    this.users.push(user)
    return true
  }

  getUser (userId) {
    return this.users.find(user => user.id === userId)
  }
  deleteUser (userId) {
    this.users = this.users.filter(user => user.id !== userId)
    return true
  }
  getGroup (userId) {
    const user = this.getUser(userId)
    return user.groupId
  }
  getIdByUserName (name) {
    return this.users.find(user => (user.name = name))
  }
  updateUser (id, data) {
    let user = this.getUser(id)

    user.id = id
    user.name = data.name ?? user.name
    user.lastName = data.lastName ?? user.lastName
    user.groupId = data.groupId ?? user.groupId
    user.status = data.status ?? user.status

    return true
  }
}

module.exports = UserRepository
