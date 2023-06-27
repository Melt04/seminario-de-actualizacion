class User {
  constructor ({ name, lastName, status = 'ACTIVE', id = null }) {
    this.id = id
    this.name = name
    this.lastName = lastName
    this.status = status
  }
}
module.exports = User
