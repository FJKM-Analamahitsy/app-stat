const express = require("express");
const { getCoordinates, getList } = require("../controllers/diacre.controller");

const route = express.Router();

route.get("/", getList);
route.get("/gps", getCoordinates);

module.exports.diacre = route;
