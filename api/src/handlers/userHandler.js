class UserHandler {
  constructor (db) {
    this.db = db
  }
  async create (userData) {
    const { name, lastName, status } = userData
    try {
      const query = `'${name}','${lastName}' ${
        status ? `,'${status}` : ',null'
      }'`
      const data = await this.db.query(
        /* `CALL createUser('${name}','${lastName}')` */
        `CALL createUser(${query})`
      )
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  update (id, data) {
    return this.repository.updateUser(id, { ...data })
  }

  async getAllUsers () {
    try {
      const data = await this.db.query(`CALL selectAllUsers`)
      return data[0]
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async getUserById (id) {
    try {
      const data = await this.db.query(`CALL selectUserById (${id})`)
      return data[0]
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

module.exports = UserHandler
