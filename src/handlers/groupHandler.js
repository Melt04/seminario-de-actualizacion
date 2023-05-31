class GroupHandler {
  constructor (groupRepository) {
    this.repository = groupRepository
  }
  create (userData) {
    return this.repository.createGroup({ ...userData })
  }

  update (id, data) {
    return this.repository.updateGroup(id, { ...data })
  }

  get (id) {
    return this.repository.getGroup(id)
  }

  delete (id) {
    return this.repository.deleteGroup(id)
  }
}

module.exports = UserHandler
