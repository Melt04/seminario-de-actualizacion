class AccessHandler {
  constructor (db) {
    this.db = db
  }
  async create (accessData) {
    const { name } = accessData
    try {
      const data = await this.db.query(`CALL createAccess('${name}')`)
      console.log(data)
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async getAllAccess () {
    try {
      const data = await this.db.query(`CALL selectAllAccess`)
      return data[0]
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async getIdById (id) {
    try {
      const data = await this.db.query(`CALL selectAccessById (${id})`)
      return data[0]
    } catch (e) {
      throw e

      console.log(e)
    }
  }
}

module.exports = AccessHandler
