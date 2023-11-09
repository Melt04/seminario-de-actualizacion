class ChatContainerModel {
  constructor() {}
  async getMessages(chatId, key) {
    const response = await fetch(`http://localhost:8000/chats/message/${chatId}`, { headers: { "x-user-id": 1 } });
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
    const responseProposal = await fetch(`http://localhost:8000/proposal/${userId}`);
    const responseJson = await responseProposal.json();
    return responseJson;
  }
  async getUserList() {
    try {
      const respose = await fetch("http://localhost:8000/users");
      const userList = await respose.json();
      if (userList) {
        return userList.data;
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
