class GroupHandler {
  constructor (db) {
    this.db = db
  }
  async create (groupData) {
    const { name } = groupData
    try {
      const data = await this.db.query(`CALL createGroup('${name}')`)
      console.log(data)
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  update (id, data) {
    return this.repository.updateGroup(id, { ...data })
  }
  async getIdById (id) {
    try {
      const data = await this.db.query(`CALL selectGroupById (${id})`)
      return data[0]
    } catch (e) {
      console.log(e)
      throw e
    }
  }
  async getAllGroups () {
    try {
      const data = await this.db.query(`CALL selectAllGroups`)
      return data[0]
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  delete (id) {
    return this.repository.deleteGroup(id)
  }
}

module.exports = GroupHandler
