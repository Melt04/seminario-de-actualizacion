const { encrypt, decrypt } = require("../utils/index");
const { SessionHandler } = require("./sessionHandler");
class UserHandler {
  constructor(db) {
    this.db = db;
    this.sessionHandler = new SessionHandler(db);
  }
  async create(userData) {
    let { name, lastName, status, email, password } = userData;
    try {
      let passwordEncypted = encrypt(password);
      const query = `'${name}','${lastName}','${email}','${passwordEncypted}'${status ? `,'${status}'` : ",null"}, @userId`;
      const data = await this.db.query(`CALL createUser(${query})`);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async loginUser(email, password) {
    const encryptedPassword = encrypt(password);
    const result = await this.db.query(`CALL loginUser('${email}','${encryptedPassword}')`);
    console.log(result);
    return result;
  }

  update(id, data) {
    return this.repository.updateUser(id, { ...data });
  }

  async getAllUsers() {
    try {
      const data = await this.db.query(`CALL selectAllUsers`);
      return data[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getUserById(id) {
    try {
      const data = await this.db.query(`CALL selectUserById (${id})`);
      return data[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = UserHandler;
