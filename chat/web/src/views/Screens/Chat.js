class ChatApp extends HTMLElement {
  constructor() {
    super();
    this.sendButton = document.createElement("button");
    this.sendButton.id = "send-button";
    this.sendButton.textContent = "Enviar";
  }

  connectedCallback() {
    this.render();

    document.addEventListener("enabled-button", () => {});
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

    chatContainer.appendChild(chatMessages);
    chatContainer.appendChild(messageInput);
    chatContainer.appendChild(this.sendButton);
    this.append(chatContainer);
  }
  /*  setupEventListeners() {
    const sendButton = document.querySelector("#send-button");
    
  } */
  paintMessages(message) {
    const messageInput = this.querySelector("#message-input");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add("received-message");
    messageDiv.textContent = message;
    this.querySelector(".chat-messages").appendChild(messageDiv);
    messageInput.value = "";
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
