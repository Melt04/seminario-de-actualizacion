const Route = require("../../class/Route");
const { proposalHandler } = require("../../../handlers/proposalHandler");
const dbHandler = require("../../../model/db/dbConnection");
const { chatHandler } = require("../../../handlers/ChatHandler");
const { getBodyFromRequest } = require("../../../utils");

const getAllChats = new Route("GET", new RegExp("^/chats$"), async (req, res) => {
  try {
    const chats = chatHandler.getAllChats();
    res.write(JSON.stringify({ chats, error: false }));
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.write(JSON.stringify({ message: "Failed to get proposal", error: true }));
    res.end();
  }
});
const sendMessageRoute = new Route("POST", new RegExp("^/chats/message$"), async (req, res) => {
  try {
    body = await getBodyFromRequest(req);

    const { chatId, message } = body;
    const userId = req.headers["x-user-id"];
    if (!chatId || !message) {
      throw new Error("Failing data");
    }
    const respose = await chatHandler.sendMessage(chatId, message, userId);
    if (!respose) {
      res.write(JSON.stringify({ message: "Chat doesnt  exst", error: true }));
      res.end();
      return;
    }
    res.write(JSON.stringify({ message: "Created Successfully", error: false }));
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.write(JSON.stringify({ message: "Failed to create proposal", error: true }));
    res.end();
  }
});
const getMessagesRoutes = new Route("GET", new RegExp("^/chats/message/.*$"), async (req, res) => {
  try {
    const index = req.url.lastIndexOf("/");
    const id = req.url.slice(index + 1);
    const userId = req.headers["x-user-id"];
    const messages = chatHandler.getMessages(id, userId);
    res.write(JSON.stringify({ messages: messages.allMessages, key: messages.key, error: false }));
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.write(JSON.stringify({ message: "Failed to get proposal", error: true }));
    res.end();
  }
});
const postAceptProposal = new Route("POST", new RegExp("^/proposal/accept/\\d+$"), async (req, res) => {
  try {
    const index = req.url.lastIndexOf("/");
    const id = req.url.slice(index + 1);
    const data = proposalHandler.acceptProposal(id);
    const chatId = chatHandler.createChat().id;
    if (!data) {
      res.write(JSON.stringify({ message: "Proposal doesnt exist", error: false }));
      res.end();
      return;
    }

    res.write(JSON.stringify({ data: chatId, error: false }));
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.write(JSON.stringify({ message: "Failed to get proposal", error: true }));
    res.end();
  }
});

module.exports = {
  getAllChats,
  sendMessageRoute,
  getMessagesRoutes,
};
