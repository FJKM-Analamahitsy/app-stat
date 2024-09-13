const express = require("express");
const { getMe, login, logout } = require("../controllers/auth.controller");

const route = express.Router();

route.get("/", getMe);
route.post("/", login);
route.delete("/", logout);

module.exports.auth = route;
