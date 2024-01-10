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
route.post("/delete", deleteUser);
route.post("/update", updateUser);
route.post("/list", listUser);

module.exports.auth = route;
