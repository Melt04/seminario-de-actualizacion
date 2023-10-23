const { dataBaseHandler } = require("../DataBaseHandler/DataBaseHandler.js");
const { proposalHandler } = require("./proposalHandler.js");
const { Sanitizer } = require("../Common/Sanitizer.js");
const { chatStorage } = require("./ChatStorage.js");

class ChatHandler {
  constructor(db) {
    this.db = db;
  }
  /*   async propose(requestData, responseCallback) {
    const userOriginId = requestData.originUserId;
    const userTargetId = requestData.targetUserId;

    proposalHandler.addAProposal(userOriginId, userTargetId);

    responseCallback(200, { message: "Proposal Sended!" });
  }
 */
  askForProposal(requestData, responseCallback) {
    let proposals = new Array();
    const userOriginId = requestData.originUserId;
    let idx = 0;
    proposalHandler.listOfProposal.forEach((proposal) => {
      if (proposal["targetIdUser"] == userOriginId) {
        proposals.push({
          idProposal: idx,
          idOriginUser: proposal["originIdUser"],
          status: proposal["status"],
        });
      }
      idx++;
    });

    responseCallback(200, { proposals: proposals });
  }
  async sendMessage(requestData, responseCallback) {
    try {
      let messageData = {
        chatid: requestData.chatid,
        originId: requestData.originId,
        targetId: requestData.targetId,
        body: requestData.body,
        state: requestData.state,
      };

      chatStorage.storeChatMessages(requestData.chatid, messageData);

      responseCallback(200, {
        message: "Message Sended ok!",
        messageState: "sended",
        messageData,
      });
    } catch (error) {
      console.error(error);
    }
  }

  getMessages(requestData, responseCallback) {
    let chatid = requestData.chatid;

    let chatMessages = chatStorage.getChatMessages(chatid);

    responseCallback(200, { chatMessages });
  }

  async confirmChat(requestData, responseCallback) {
    let proposalData = {
      idProposal: Sanitizer.sanitizeInput(requestData.idProposal),
    };
  }
}

module.exports = { ChatHandler };
