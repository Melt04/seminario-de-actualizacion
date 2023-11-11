class ResourceHandler {
  constructor (db) {
    this.db = db
  }
  async create (resourceData) {
    const { name, type } = resourceData

    try {
      const data = await this.db.query(
        `CALL createResource('${name}','${type}')`
      )
      console.log(data)
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async getAllResources () {
    try {
      const data = await this.db.query(`CALL selectAllResources`)
      return data[0]
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async getResourceById (id) {
    try {
      console.log(id)
      const data = await this.db.query(`CALL selectResourceById('${id}')`)
      return data[0]
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

module.exports = ResourceHandler
