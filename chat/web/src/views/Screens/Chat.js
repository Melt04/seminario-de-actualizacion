class ChatApp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-container");
    const chatMessages = document.createElement("div");
    chatMessages.classList.add("chat-messages");
    const messageInput = document.createElement("input");
    messageInput.type = "text";
    messageInput.id = "message-input";
    messageInput.classList.add("message-input");
    messageInput.placeholder = "Escribe un mensaje";
    const sendButton = document.createElement("button");
    sendButton.id = "send-button";
    sendButton.textContent = "Enviar";
    chatContainer.appendChild(chatMessages);
    chatContainer.appendChild(messageInput);
    chatContainer.appendChild(sendButton);
    this.append(chatContainer);
  }
  setupEventListeners() {
    const sendButton = document.querySelector("#send-button");
    sendButton.addEventListener("click", () => this.sendMessage());
  }
  paintMessages(message) {
    const messageInput = this.querySelector("#message-input");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add("received-message");
    messageDiv.textContent = message;
    this.querySelector(".chat-messages").appendChild(messageDiv);
    messageInput.value = "";
  }
  sendMessage() {
    const messageInput = this.querySelector("#message-input");
    const message = messageInput.value;
    if (message) {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message");
      messageDiv.classList.add("sent-message");
      messageDiv.textContent = message;
      this.querySelector(".chat-messages").appendChild(messageDiv);
      messageInput.value = "";
      const event = this.dispatchEvent(
        new CustomEvent("send-message", {
          detail: {
            message: message,
          },
        })
      );
    }
  }
  disconnectedCallback() {
    this.childNodes.forEach((n, index) => {
      console.log(index);
      console.log(n);
      this.removeChild(n);
    });
  }

  receiveMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add("received-message");
    messageDiv.textContent = message;
    this.querySelector(".chat-messages").appendChild(messageDiv);
  }
}

customElements.define("chat-app", ChatApp);

export { ChatApp };
