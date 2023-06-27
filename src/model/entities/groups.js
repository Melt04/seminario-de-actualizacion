class Group {
  constructor ({ name, enabled = true, id = null }) {
    this.id = id
    this.name = name
    this.enabled = enabled
  }
}
module.exports = Group
