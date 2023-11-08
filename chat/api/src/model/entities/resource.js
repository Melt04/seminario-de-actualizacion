class Resource {
  constructor ({ name, type, id = null }) {
    this.id = id
    this.name = name
    this.type = type
  }
}
module.exports = Resource
