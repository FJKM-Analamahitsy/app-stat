const express = require("express");
const {
  createAdidy,
  deleteAdidy,
  listAdidy,
  adidympandray,
} = require("../controllers/adidy.controller");

const route = express.Router();

route.post("/", createAdidy);
route.delete("/", deleteAdidy);
route.get("/", listAdidy);
route.get("/mpandray", adidympandray);

module.exports.adidy = route;
