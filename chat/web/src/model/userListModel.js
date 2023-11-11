class UserListModel {
  constructor() {}

  startProposal(id) {
    document.dispatchEvent(new CustomEvent("start-proposal", { detail: id }));
  }
}

export { UserListModel };
