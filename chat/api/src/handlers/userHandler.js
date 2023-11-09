class UserHandler {
  constructor(db) {
    this.db = db;
  }
  async create(userData) {
    const { name, lastName, status, email, password } = userData;
    try {
      /* const query = `'${name}','${lastName}','${email}','${password}' ${status ? `,'${status}` : ",null"}','@userId'`;
      const data = await this.db.query(`CALL createUser(${query})`); */
      const query = `'${name}','${lastName}','${email}','${password}'${status ? `,'${status}'` : ",null"}, @userId`;
      const data = await this.db.query(`CALL createUser(${query})`);
      return data;
    } catch (e) {
      return false;
    }
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
