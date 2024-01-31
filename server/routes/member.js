const express = require("express");
const {
  createMember,
  deleteMember,
  updateMember,
  listMember,
  getMember,
  exportMembersToCsv,
  searchMember,
} = require("../controllers/member.controller");
const {authMiddlware} = require('../controllers/middleware')

const route = express.Router();

route.post("/",authMiddlware, createMember);
route.delete("/",authMiddlware, deleteMember);
route.put("/", authMiddlware,updateMember);
route.get("/", authMiddlware,listMember);
route.get("/get/:id", authMiddlware,getMember);
route.get("/export", exportMembersToCsv);
route.get("/search", authMiddlware,searchMember);

module.exports.member = route;
