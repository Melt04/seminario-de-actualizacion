class ChatContainerController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.proposal = null;
    this.chatId = null;
    this.key = null;
    this.intervalGetProposal = null;
    this.intervalGetMessages = null;
    this.view.chat.addEventListener("send-message", async ({ detail }) => {
      console.log(detail);
      this.sendMessage(detail.message);
    });
    document.addEventListener("log-out", () => {
      clearInterval(this.intervalGetMessages);
      clearInterval(this.intervalGetProposal);
    });
    document.addEventListener("start-proposal", async ({ detail }) => {
      await this.model.createProposal(detail);
    });
  }
  async init() {
    this.view.button.addEventListener("click", async () => this.getUserList());

    this.intervalGetMessages = setInterval(async () => {
      if (this.chatId != null) {
        const messageResponse = await this.getMessages(this.chatId);
        const messages = messageResponse.messages;

        this.key = messageResponse.key;
        if (!this.send) {
          this.send = true;
        }

        if (messageResponse && messages.length > 0) {
          this.view.chat.paintMessages(messages);
        }
      }
    }, 2000);
    this.intervalGetProposal = setInterval(async () => {
      await this.getMessageProposal();
    }, 2000);
    const users = await this.getUserList();
  }
  async getMessages(chatId) {
    const data = await this.model.getMessages(chatId, this.key);
    return data;
  }
  async getMessageProposal(userId) {
    const data = await this.model.getMessageProposal(userId);
    const proposal = data?.responseData;
    if (proposal && Object.keys(proposal).length > 0 && this.proposal === null) {
      const response = confirm(`Usted tiene una propuesta de mensaje `);
      if (response) {
        const resposeProposal = await this.model.acceptProposal(proposal.proposalId);
        this.proposal = proposal.proposalId;
        this.chatId = resposeProposal.chatId;
      } else {
        await this.model.rejectProposal(proposal.proposalId);
        alert("proposal was rejected");
      }
    }
  }
  async getUserList() {
    const data = await this.model.getUserList();
    const event = document.dispatchEvent(
      new CustomEvent("update-user-list", {
        detail: {
          users: data,
        },
      })
    );
    return data;
  }
  async sendMessage(message) {
    await this.model.sendMessage(message, this.chatId, this.key);
  }
}

export { ChatContainerController };
