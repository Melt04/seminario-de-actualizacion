const { Proposal } = require("../model/entities/proposal");
class ProposalHandler {
  constructor() {
    this.listOfProposal = [];
  }

  addAProposal(originUser, destUser) {
    if (!this.existProposal(originUser, destUser)) {
      const index = this.listOfProposal.length + 1;
      const proposal = new Proposal(originUser, destUser, index);
      this.listOfProposal.push(proposal);
      return true;
    }
    return false;
  }
  rejectProposal(proposalId) {
    this.listOfProposal = this.listOfProposal.filter((element) => {
      return element.proposalId != proposalId;
    });
    return true;
  }
  acceptProposal(proposalId) {
    const proposal = this.listOfProposal.find((p) => p.proposalId == proposalId);
    if (proposal) {
      proposal.status = "ACCEPT";
      return true;
    }
    return false;
  }
  existProposal(originUser, destUser) {
    const proposalFind = this.listOfProposal.find((pro) => (pro.originUser == originUser && pro.destUser == destUser) || (pro.originUser == destUser && pro.destUser == originUser));

    return proposalFind == undefined ? false : true;
  }
  getProposalById(id) {
    return this.listOfProposal.find((p) => p.proposalId == id);
  }
  getProposalByUser(user) {
    console.log(user);
    console.log(this.listOfProposal);
    return this.listOfProposal.find((p) => p.destUser == user);
  }
}

const proposalHandler = new ProposalHandler();

module.exports = { proposalHandler };
