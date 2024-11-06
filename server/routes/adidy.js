const express = require("express");
const {
  createAdidy,
  deleteAdidy,
  getAdidyTrace,
  getCompta,
  getType,
  createType,
  updateType,
  deleteType,
} = require("../controllers/adidy.controller");

const route = express.Router();

route.post("/", createAdidy);
route.get("/trace/:id", getAdidyTrace);
route.delete("/:id", deleteAdidy);
route.get("/", getCompta);
route.get("/type", getType);
route.post("/type", createType);
route.patch("/type/:id", updateType);
route.delete("/type/:id", deleteType);

module.exports.adidy = route;
