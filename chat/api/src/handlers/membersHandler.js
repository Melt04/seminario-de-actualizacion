class MembersHandler {
  constructor (db) {
    this.db = db
  }
  async addUserToGroup ({ idUser, idGroup }) {
    try {
      const data = await this.db.query(`CALL addUserToGroup
('${idUser}',${idGroup})`)
      console.log(data)
      return true
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async selectAllMembers () {
    try {
      const data = await this.db.query(`CALL selectAllMembers`)
      return data[0]
    } catch (e) {
      console.log(e)
      throw e
    }
  }
  async selectMembersByGroup (id) {
    try {
      const data = await this.db.query(`CALL selectAllMembersForGroup
('${id}')`)
      return data[0]
    } catch (e) {
      console.log(e)
      throw e
    }
  }
  async removeUserFromGroup ({ idUser, idGroup }) {
    try {
      const data = await this.db.query(`CALL removeUserFromGroup
('${idUser}','${idGroup}')`)
      return data[0]
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

module.exports = MembersHandler
