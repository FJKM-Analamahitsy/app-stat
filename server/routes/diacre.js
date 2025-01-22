const express = require("express");
const { getCoordinates } = require("../controllers/diacre.controller");

const route = express.Router();

route.get("/gps", getCoordinates);

module.exports.diacre = route;
