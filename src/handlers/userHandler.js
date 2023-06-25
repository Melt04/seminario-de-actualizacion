class UserHandler {
  constructor (db) {
    this.db = db
  }

  async create (userData) {
    const { name, last_name, status } = userData
    try {
      const data = await this.db.query(
        `CALL createUser('${name}','${last_name}')`
      )
      console.log(data)
    } catch (e) {
      console.log(e)
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
    }
  }

  delete (id) {
    return this.repository.deleteUser(id)
  }

  getGroup (id) {
    return this.repository.getGroup(id)
  }

  async getIdById (id) {
    try {
      const data = await this.db.query(`CALL selectUserById (${id})`)
      return data[0]
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = UserHandler
