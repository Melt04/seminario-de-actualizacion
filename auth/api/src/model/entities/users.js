class User {
  constructor({ name, lastName, status = "ACTIVE", id = null, password, email }) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.status = status;
  }
}
module.exports = User;
