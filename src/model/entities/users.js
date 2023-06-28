class User {
  constructor ({
    name,
    lastName,
    username,
    password,
    status = 'ACTIVE',
    id = null
  }) {
    this.id = id
    this.name = name
    this.lastName = lastName
    this.username = username
    this.password = password
    this.status = status
  }
}
module.exports = User
