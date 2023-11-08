const { proposalHandler } = require("./proposalHandler.js");
const { randomUUID } = require("node:crypto");
const dbHandler = require("../model/db/dbConnection.js");

const Chat = require("../model/entities/chat.js");

class ChatHandler {
  constructor(db) {
    this.db = db;
    this.chats = [];
  }
  getAllChats() {
    return this.chats;
  }

  async sendMessage(chatId, message) {
    const chatFound = this.chats.find((c) => {
      return c.id == chatId;
    });
    if (chatFound) {
      chatFound.messages.push(message);
      return true;
    }
    return false;
  }

  getMessages(chatId) {
    const chatFound = this.chats.find((c) => {
      return c.id == chatId;
    });
    console.log(chatFound);
    if (chatFound) {
      const allMessages = [];
      while (chatFound.messages.length > 0) {
        const message = chatFound.messages.pop();

        allMessages.push(message);
      }
      return allMessages;
    }
    return [];
  }
  closeChat(chatId) {
    const chatFound = this.chats.indexOf((c) => {
      return c.id == chatId;
    });

    if (chatFound) {
      this.chats.splice(chatFound, 1);
      return true;
    }
    return false;
  }
  createChat() {
    const id = randomUUID();
    const key = this.generateKey();
    const chat = new Chat({ id, key });
    this.chats.push(chat);
    return chat.id;
  }
  generateKey() {
    return randomUUID();
  }
}
const chatHandler = new ChatHandler(dbHandler);
module.exports = { chatHandler };
