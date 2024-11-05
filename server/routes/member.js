const express = require("express");
const {
  createMember,
  deleteMember,
  updateMember,
  listMember,
  getMember,
  exportMembersToCsv,
  statistics,
  getFamily,
  getLastKaratra,
  checkKaratra,
  statPerBirthMonth,
  statPerSampana,
} = require("../controllers/member.controller");

const route = express.Router();

route.post("/", createMember);
route.delete("/", deleteMember);
route.patch("/:id", updateMember);
route.get("/", listMember);
route.get("/get/:id", getMember);
route.get("/export", exportMembersToCsv);
route.get("/stat", statistics);
route.get("/stat/monthly", statPerBirthMonth);
route.get("/stat/sampana", statPerSampana);
route.get("/family/:id", getFamily);
route.get("/lastKaratra", getLastKaratra);
route.get("/check/:num", checkKaratra);

module.exports.member = route;
