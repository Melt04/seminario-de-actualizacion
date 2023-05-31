class UserHandler {
  constructor (userRepository) {
    this.repository = userRepository
  }
  create (userData) {
    return this.repository.createUser({ ...userData })
  }

  update (id, data) {
    return this.repository.updateUser(id, { ...data })
  }

  get (id) {
    return this.repository.getUser(id)
  }

  delete (id) {
    return this.repository.deleteUser(id)
  }

  getGroup (id) {
    return this.repository.getGroup(id)
  }

  getIdByUserName (userName) {
    return this.repository.getIdByUserName(userName)
  }
}

module.exports = UserHandler
