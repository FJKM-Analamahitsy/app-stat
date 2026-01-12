const express = require("express");
const {
  getAllGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/group.controller");

const route = express.Router();

route.get("/", getAllGroup);
route.post("/", createGroup);
route.patch("/:id", updateGroup);
route.delete("/:id", deleteGroup);

module.exports.group = route;
