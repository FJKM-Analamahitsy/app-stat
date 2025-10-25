const express = require("express");
const {
  createMember,
  deleteMember,
  updateMember,
  listMember,
  getMember,
  exportMembers,
  statistics,
  getFamily,
  getLastKaratra,
  checkKaratra,
  statPerBirthMonth,
  statPerSampana,
  importMembers,
  generateUserToken,
} = require("../controllers/member.controller");
const multer = require("multer");

const route = express.Router();

const upload = multer({
  dest: "uploads/",
});

route.post("/", createMember);
route.post("/export", exportMembers);
route.post("/import", upload.single("file"), importMembers);
route.delete("/", deleteMember);
route.patch("/:id", updateMember);
route.get("/", listMember);
route.get("/token/:id", generateUserToken);
route.get("/get/:id", getMember);
route.get("/stat", statistics);
route.get("/stat/monthly", statPerBirthMonth);
route.get("/stat/sampana", statPerSampana);
route.get("/family/:id", getFamily);
route.get("/lastKaratra", getLastKaratra);
route.get("/check/:num", checkKaratra);

module.exports.member = route;
