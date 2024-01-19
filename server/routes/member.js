const express = require("express");
const {
  createMember,
  deleteMember,
  updateMember,
  listMember,
  getMember,
  exportMembersToCsv,
} = require("../controllers/member.controller");

const route = express.Router();

route.post("/", createMember);
route.delete("/", deleteMember);
route.put("/", updateMember);
route.get("/", listMember);
route.get("/get/:id", getMember);
route.get("/export", exportMembersToCsv);

module.exports.member = route;
