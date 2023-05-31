class User {
  constructor ({ name, lastName, groupId, status }) {
    this.id = null
    this.name = name
    this.lastName = lastName
    this.groupId = groupId
    this.status = status
  }
  setId (id) {
    this.id = id
  }
}
module.exports = User
