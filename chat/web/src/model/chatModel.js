class ChatModel {
  constructor() {
    this.state = false;
  }
  getState() {
    return this.state;
  }
  enableChat() {
    this.state = true;
  }
}

export { ChatModel };
