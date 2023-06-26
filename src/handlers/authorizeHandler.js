class Authorizer {
  constructor (db) {
    this.db = db
  }
  authorizeAccessToResource ({ resId, accessId }) {
    try {
      const data = await this.db.query(
  `CALL assignAccessToResource('${resId}','${accessId}')`
)

      return data
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

module.exports = Authorizer
