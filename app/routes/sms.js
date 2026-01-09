const express = require("express");
const { getToken, sendSms } = require("../controllers/sms.controller");
const route = express.Router();

route.get("/token", getToken);
route.post("/", sendSms);

module.exports.sms = route;
