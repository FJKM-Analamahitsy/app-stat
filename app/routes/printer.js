const express = require("express");
const { PrintReceipt } = require("../controllers/xprinter.controller");

const route = express.Router();

route.post("/", PrintReceipt);

module.exports.printer = route;
