const crypto = require("crypto");
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};
const encrypt = (text) => {
  const cipher = crypto.createCipher("aes-256-cbc", process.env.SECRET_PASSWORD);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrypt = (encryptedText) => {
  try {
    const decipher = crypto.createDecipher("aes-256-cbc", process.env.SECRET_PASSWORD);
    let decrypted = decipher.update(encryptedText, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  } catch (e) {
    console.log(e);
    throw new Error("FAil to decrypt");
  }
};

async function getBodyFromRequest(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      try {
        body = JSON.parse(body);
        resolve(body);
      } catch (e) {
        reject(new Error("Failed at parsing body"));
      }
    });
  });
}

module.exports = { getBodyFromRequest, encrypt, decrypt };
