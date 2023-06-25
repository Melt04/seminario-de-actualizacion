class User {
  constructor ({ name, lastName, status = 'ACTIVE' }) {
    this.name = name
    this.lastName = lastName
    this.status = status
  }
}
module.exports = { User }
