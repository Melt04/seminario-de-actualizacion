class Proposal {
  constructor(originUser, destUser, proposalId, status = "created") {
    this.originUser = originUser;
    this.destUser = destUser;
    this.proposalId = proposalId;
    this.status = status;
  }
}
module.exports = { Proposal };
