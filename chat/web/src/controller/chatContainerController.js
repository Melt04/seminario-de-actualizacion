class ChatContainerController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.proposal = null;
    this.chatId = null;
  }
  async init() {
    this.view.button.addEventListener("click", async () => this.getUserList());
    this.intervalGetMessages = setInterval(async () => {
      if (this.chatId != null) {
        const message = await this.getMessages(this.chatId);
        this.view.chat.paintMessages(message);
      }
    }, 5000);
    this.intervalGetProposal = setInterval(async () => {
      await this.getMessageProposal(1);
    }, 5000);
    const users = await this.getUserList();
  }
  async getMessages(chatId) {
    const data = await this.model.getMessages(chatId);
    console.log(data);
  }
  async getMessageProposal(userId) {
    const data = await this.model.getMessageProposal(userId);
    const proposal = data.responseData;
    if (proposal && this.proposal === null) {
      const response = confirm(`Usted tiene una propuesta de mensaje = ${proposal.proposalId} `);
      if (response) {
        const responseAcceptProposal = await fetch(`http://localhost:8000/proposal/accept/${proposal.proposalId}`, { method: "POST" });
        const jsonAcceptProposal = await responseAcceptProposal.json();

        this.proposal = proposal.proposalId;
        this.chatId = jsonAcceptProposal.chatId;
      } else {
        await fetch(`http://localhost:8000/proposal/reject/${proposal.proposalId}`, { method: "POST" });
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
    console.log(event);
    return data;
  }
}

export { ChatContainerController };
