class UserHandler {
  constructor (db) {
    this.db = db
  }
  async create (userData) {
    const { name, lastName, status } = userData
    try {
      const data = await this.db.query(
        `CALL createUser('${name}','${lastName}')`
      )
      console.log(data)
    } catch (e) {
      console.log(e)
      throw e
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

  async getIdById (id) {
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
