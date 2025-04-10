const express = require("express");
const { Print } = require("../controllers/xprinter.controller");

const route = express.Router();

route.post("/", Print);

module.exports.printer = route;
