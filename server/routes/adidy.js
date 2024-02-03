const express = require("express");
const { createAdidy, deleteAdidy } = require("../controllers/adidy.controller");

const route = express.Router();

route.post("/", createAdidy);
route.delete("/", deleteAdidy);

module.exports.adidy = route;
