class ChatContainerModel {
  constructor() {}
  async getMessages(chatId, key) {
    const token = localStorage.getItem("x-session-token");
    const response = await fetch(`http://localhost:8000/chats/message/${chatId}`, { headers: { "x-session-token": token } });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const decrypMessage = [];
    jsonResponse.messages.forEach((m) => {
      const dm = this.decryptText(m, key);
      decrypMessage.push(dm);
    });
    return { messages: decrypMessage, key: jsonResponse.key };
  }
  async sendMessage(message, chatId, key) {
    const cryptedMessage = this.encryptText(message, key);
    const payload = {
      chatId,
      message: cryptedMessage,
    };
    const response = await fetch(`http://localhost:8000/chats/message`, { method: "POST", body: JSON.stringify(payload) });
    const responseJson = await response.json();
    console.log(responseJson);
  }
  async getMessageProposal(userId) {
    const token = localStorage.getItem("x-session-token");
    const responseProposal = await fetch(`http://localhost:8000/proposal/me`, { headers: { "x-session-token": token } });
    const responseJson = await responseProposal.json();
    console.log(responseJson);
    return responseJson;
  }
  async acceptProposal(proposalId) {
    const token = localStorage.getItem("x-session-token");
    const responseAcceptProposal = await fetch(`http://localhost:8000/proposal/accept/${proposalId}`, { method: "POST", headers: { "x-session-token": token } });
    const jsonAcceptProposal = await responseAcceptProposal.json();
    console.log(jsonAcceptProposal);

    return {
      chatId: jsonAcceptProposal.chatId,
    };
  }
  async rejectProposal() {}
  async getUserList() {
    try {
      const token = localStorage.getItem("x-session-token");
      const respose = await fetch("http://localhost:8000/users", { headers: { "x-session-token": token } });
      const userList = await respose.json();
      if (userList && userList.filteredUsers) {
        return userList.filteredUsers;
      }
    } catch (e) {
      console.log(e);
    }
  }
  encryptText(text, secretKey) {
    console.log(text);
    console.log(secretKey);
    const encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString();
    console.log(encryptedText);
    return encryptedText;
  }

  decryptText(text, secretKey) {
    const decryptedBytes = CryptoJS.AES.decrypt(text, secretKey);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }
}

export { ChatContainerModel };
