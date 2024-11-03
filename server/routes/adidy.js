const express = require("express");
const {
  createAdidy,
  deleteAdidy,
  listAdidy,
  adidympandray,
  getAdidyTrace,
} = require("../controllers/adidy.controller");
const { authMiddlware } = require("../controllers/middleware");

const route = express.Router();

route.post("/", authMiddlware, createAdidy);
route.get("/trace/:id", authMiddlware, getAdidyTrace);
route.delete("/", authMiddlware, deleteAdidy);
route.get("/", authMiddlware, listAdidy);
route.get("/mpandray", authMiddlware, adidympandray);

module.exports.adidy = route;
