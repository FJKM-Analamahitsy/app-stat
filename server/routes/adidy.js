const express = require("express");
const {
  createAdidy,
  deleteAdidy,
  listAdidy,
} = require("../controllers/adidy.controller");

const route = express.Router();

route.post("/", createAdidy);
route.delete("/", deleteAdidy);
route.get("/", listAdidy);

module.exports.adidy = route;
