class ChatContainerModel {
  constructor() {}
  async getMessages(chatId) {
    const response = await fetch(`http://localhost:8000/chats/message/${chatId}`);
    const jsonResponse = await response.json();
    return jsonResponse;
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
  encryptText(secretKey, text) {
    const encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString();
    console.log(encryptedText);
    return encryptedText;
  }

  decryptText(secretKey, text) {
    const decryptedBytes = CryptoJS.AES.decrypt(text, secretKey);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    console.log(decryptedText);
  }
}

export { ChatContainerModel };
