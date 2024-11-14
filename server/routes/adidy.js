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
  getComptaById,
  getDailySummary,
  getAllCreator,
  getAnnualySummary,
} = require("../controllers/adidy.controller");

const route = express.Router();

route.get("/trace/:id", getAdidyTrace);
route.get("/", getCompta);
route.get("/byid/:id", getComptaById);
route.get("/type", getType);
route.get("/summary/daily", getDailySummary);
route.get("/summary/annualy", getAnnualySummary);
route.get("/creator", getAllCreator);
route.post("/type", createType);
route.post("/", createAdidy);
route.patch("/type/:id", updateType);
route.delete("/type/:id", deleteType);
route.delete("/:id", deleteAdidy);

module.exports.adidy = route;
