const express = require("express");
const {
  createAdidy,
  deleteAdidy,
  listAdidy,
  adidympandray,
  getAdidyTrace,
} = require("../controllers/adidy.controller");

const route = express.Router();

route.post("/", createAdidy);
route.get("/trace/:id", getAdidyTrace);
route.delete("/", deleteAdidy);
route.get("/", listAdidy);
route.get("/mpandray", adidympandray);

module.exports.adidy = route;
