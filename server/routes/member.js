const express = require("express");
const {
  createMember,
  deleteMember,
  updateMember,
  listMember,
  getMember,
} = require("../controllers/member.controller");

const route = express.Router();

route.post("/", createMember);
route.delete("/", deleteMember);
route.put("/", updateMember);
route.get("/", listMember);
route.get("/:id", getMember);

module.exports.member = route;
