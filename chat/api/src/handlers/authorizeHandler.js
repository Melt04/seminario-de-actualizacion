class Authorizer {
  constructor (db) {
    this.db = db
  }
  async authorizeAccessToResource ({ resId, accessId }) {
    try {
      const data = await this.db.query(
        `CALL assignAccessToResource('${resId}','${accessId}')`
      )

      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
  async authorizeGroupToAccess ({ groupId, accessId }) {
    try {
      const data = await this.db.query(
        `CALL assingAccessToGroup
('${groupId}','${accessId}')`
      )

      return data
    } catch (e) {
      console.log(e)
      throw e
    }
  }
  async userIsAuthorized ({ userId, resourceId }) {
    try {
      const data = await this.db.query(
        `CALL userHasAccessToResource

('${userId}','${resourceId}')`
      )
      return data[0].length > 0
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

module.exports = Authorizer
