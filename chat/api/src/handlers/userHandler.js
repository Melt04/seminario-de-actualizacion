const crypto = require("crypto");
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};
const encrypt = (text, secretKey) => {
  const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// Función para desencriptar datos
const decrypt = (encryptedText, secretKey) => {
  const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

class UserHandler {
  constructor(db) {
    this.db = db;
  }
  async create(userData) {
    let { name, lastName, status, email, password } = userData;
    try {
      /* let testEncrypt = JSON.stringify(userData);
      let crypted = encrypt(testEncrypt, "hola");
      console.log(crypted);
      let decrypted = decrypt(crypted, "hola");
      console.log(decrypted);
      console.log(JSON.parse(decrypted));
      password = hashPassword(password); */
      const query = `'${name}','${lastName}','${email}','${password}'${status ? `,'${status}'` : ",null"}, @userId`;
      const data = await this.db.query(`CALL createUser(${query})`);
      return data;
    } catch (e) {
      console.log(e);
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
