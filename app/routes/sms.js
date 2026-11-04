const express = require("express");
const {
  getToken,
  sendSms,
  getBalance,
} = require("../controllers/sms.controller");
const route = express.Router();

route.get("/token", getToken);
route.get("/balance", getBalance);
route.post("/", sendSms);

module.exports.sms = route;
