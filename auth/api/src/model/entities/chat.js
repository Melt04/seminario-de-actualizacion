class Chat {
  constructor({ id, key, messages = [] }) {
    this.id = id;
    this.messages = messages;
    this.key = key;
  }
}
module.exports = Chat;
