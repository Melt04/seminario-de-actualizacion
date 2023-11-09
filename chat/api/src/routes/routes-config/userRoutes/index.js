const UserHandler = require("../../../handlers/userHandler");
const dbHandler = require("../../../model/db/dbConnection");
const Route = require("../../class/Route");
const User = require("../../../model/entities/users");
const { getBodyFromRequest } = require("../../../utils");

const userHandler = new UserHandler(dbHandler);

const userCreateRoute = new Route("POST", new RegExp("^/users$"), async (req, res) => {
  try {
    body = await getBodyFromRequest(req);
    console.log(body);
    if (!body?.name || !body?.lastName || !body?.password || !body?.email) {
      res.statusCode = 400;
      res.write(JSON.stringify({ message: "Missing data", error: true }));
      return res.end();
    }
    const user = new User({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
      status: body?.status,
    });
    const result = await userHandler.create(user);
    if (!result) {
      throw new Error("Failed to create User");
    }
    const id = result[0][0].userId;

    res.setHeader("x-user-id", id);

    res.write(JSON.stringify({ message: "Created Successfully", error: false }));
    return res.end();
  } catch (e) {
    res.statusCode = 500;
    console.log(e);
    res.write(JSON.stringify({ message: "Failed to create user", error: true }));

    res.end();
  }
});
const getAllUsers = new Route("GET", new RegExp("^/users$"), async (req, res) => {
  try {
    const data = await userHandler.getAllUsers();
    res.write(JSON.stringify({ data, error: false }));
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.write(JSON.stringify({ message: "Failed to get all users", error: true }));
    res.end();
  }
});
const getUserById = new Route("GET", new RegExp("^/users/\\d+$"), async (req, res) => {
  try {
    const index = req.url.lastIndexOf("/");
    const id = req.url.slice(index + 1);
    const data = await userHandler.getUserById(id);
    res.write(JSON.stringify({ data, error: false }));
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.write(JSON.stringify({ message: "Failed to get all users" }));
    res.end();
  }
});

module.exports = {
  getAllUsers,
  userCreateRoute,
  getUserById,
};
