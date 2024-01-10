const express = require("express");
const {
  login,
  createUser,
  deleteUser,
  updateUser,
  listUser,
} = require("../controllers/user.controller");

const route = express.Router();

route.post("/", login);
route.post("/new", createUser);
route.delete("/", deleteUser);
route.put("/", updateUser);
route.get("/", listUser);

module.exports.auth = route;
