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

  async sendMessage(chatId, message, userId) {
    const chatFound = this.chats.find((c) => {
      return c.id == chatId;
    });
    if (chatFound) {
      console.log(userId);
      chatFound.messages.push({ userId, message });
      return true;
    }
    return false;
  }

  getMessages(chatId, userId) {
    const chatFound = this.chats.find((c) => {
      return c.id == chatId;
    });
    if (chatFound) {
      const allMessages = [];
      chatFound.messages = chatFound.messages.filter((mess) => {
        if (mess.userId !== userId) {
          allMessages.push(mess.message);
          return false;
        }
        return true;
      });
      console.log("chatFound");
      console.log(chatFound);

      const key = chatFound.key;
      return { allMessages, key };
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
