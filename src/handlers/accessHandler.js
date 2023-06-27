class AccessHandler {
  constructor (db) {
    this.db = db
  }
  async create (accessData) {
    const { name } = accessData
    try {
      await this.db.query(`CALL createAccess('${name}')`)
      return true
    } catch (e) {
      console.log(e)
      return false
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

  async getAccessById (id) {
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
