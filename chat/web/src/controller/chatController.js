class ChatController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.view.sendButton.addEventListener("click", () => this.sendMessage());
    document.addEventListener("enabled-button", () => {
      this.model.enableChat();
    });
  }
  sendMessage() {
    if (!this.model.getState()) {
      alert("No pueds enviar mensajes hasta tener un chat/propuesta asignada");
    }
    const messageInput = this.view.querySelector("#message-input");
    const message = messageInput.value;
    if (message) {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message");
      messageDiv.classList.add("sent-message");
      messageDiv.textContent = message;
      this.view.querySelector(".chat-messages").appendChild(messageDiv);
      messageInput.value = "";
      const event = this.view.dispatchEvent(
        new CustomEvent("send-message", {
          detail: {
            message: message,
          },
        })
      );
    }
  }
}

export { ChatController };
