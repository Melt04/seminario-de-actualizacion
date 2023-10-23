const Route = require("../../class/Route");
const { proposalHandler } = require("../../../handlers/proposalHandler");
const { getBodyFromRequest } = require("../../../utils");

const proposalCreateRoute = new Route(
  "POST",
  new RegExp("^/proposal$"),
  async (req, res) => {
    try {
      body = await getBodyFromRequest(req);
      const { originUser, destUser } = body;
      if (!originUser || !destUser) {
        throw new Error("Failing data");
      }
      const respose = proposalHandler.addAProposal(originUser, destUser);
      if (!respose) {
        res.write(
          JSON.stringify({ message: "Proposal alredy exist", error: true })
        );
        res.end();
        return;
      }
      res.write(
        JSON.stringify({ message: "Created Successfully", error: false })
      );
      res.end();
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.write(
        JSON.stringify({ message: "Failed to create proposal", error: true })
      );

      res.end();
    }
  }
);
const getProposalById = new Route(
  "GET",
  new RegExp("^/proposal/\\d+$"),
  async (req, res) => {
    try {
      const index = req.url.lastIndexOf("/");
      const id = req.url.slice(index + 1);
      const data = proposalHandler.getProposalById(id);
      const responseData = data != undefined ? data : [];
      res.write(JSON.stringify({ responseData, error: false }));
      res.end();
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.write(
        JSON.stringify({ message: "Failed to get proposal", error: true })
      );
      res.end();
    }
  }
);
const getProposalByUser = new Route(
  "GET",
  new RegExp("^/proposal/user/\\d+$"),
  async (req, res) => {
    try {
      const index = req.url.lastIndexOf("/");
      const id = req.url.slice(index + 1);
      const data = proposalHandler.getProposalByUser(id);
      const responseData = data != undefined ? data : [];
      res.write(JSON.stringify({ responseData, error: false }));
      res.end();
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.write(
        JSON.stringify({ message: "Failed to get proposal", error: true })
      );
      res.end();
    }
  }
);
const postAceptProposal = new Route(
  "GET",
  new RegExp("^/proposal/accept/\\d+$"),
  async (req, res) => {
    try {
      const index = req.url.lastIndexOf("/");
      const id = req.url.slice(index + 1);
      const data = proposalHandler.acceptProposal(id);

      if (!data) {
        res.write(
          JSON.stringify({ message: "Proposal doesnt exist", error: false })
        );
        res.end();
        return;
      }

      res.write(JSON.stringify({ message: "Propose Accepted", error: false }));
      res.end();
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.write(
        JSON.stringify({ message: "Failed to get proposal", error: true })
      );
      res.end();
    }
  }
);

module.exports = {
  getProposalById,
  proposalCreateRoute,
  getProposalByUser,
  postAceptProposal,
};
