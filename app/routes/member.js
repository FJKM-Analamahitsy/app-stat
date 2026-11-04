const express = require("express");
const {
  createMember,
  deleteMember,
  updateMember,
  listMember,
  getMember,
  exportMembers,
  getFamily,
  getLastKaratra,
  checkKaratra,
  importMembers,
  generateUserToken,
  getAllMemberToken,
  getPhoneNumber,
} = require("../controllers/member.controller");
const multer = require("multer");

const route = express.Router();

const upload = multer({
  dest: "uploads/",
});

route.post("/", createMember);
route.post("/export", exportMembers);
route.post("/import", upload.single("file"), importMembers);
route.get("/phone", getPhoneNumber);
route.delete("/", deleteMember);
route.patch("/:id", updateMember);
route.get("/", listMember);
route.get("/token/:id", generateUserToken);
route.get("/get/token", getAllMemberToken);
route.get("/get/:id", getMember);
route.get("/family/:id", getFamily);
route.get("/lastKaratra", getLastKaratra);
route.get("/check/:num", checkKaratra);

module.exports.member = route;
