const { encrypt, decrypt } = require("../utils");

class SessionHandler {
  constructor(db) {
    this.db = db;
  }
  async generateToken(userData) {
    const data = {
      userId: userData.userId,
      email: userData.email,
    };
    const token = encrypt(JSON.stringify(data));
    return token;
  }
  async validateSession(sessionToken) {
    if (!sessionToken) {
      return {
        error: true,
        message: "Missing token",
      };
    }
    const decryptedSessionToken = decrypt(sessionToken);
    const parsedDecryptedToken = JSON.parse(decryptedSessionToken);
    const userId = parsedDecryptedToken.userId;
    const found = await this.validateUserToken(userId);

    if (found.length <= 0) {
      return {
        error: true,
        message: "invalid token",
      };
    }
    return {
      error: false,
      userId: found[0].id,
    };
  }

  async validateUserToken(userid) {
    console.log("user");
    console.log(userid);
    try {
      const data = await this.db.query(`CALL selectUserById (${userid})`);
      return data[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = { SessionHandler };
