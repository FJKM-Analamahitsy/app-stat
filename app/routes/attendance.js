const express = require("express");
const {
  deleteAttendance,
  addAttendance,
  getAttendance,
} = require("../controllers/attendance.controller");

const router = express.Router();

router.get("/", getAttendance);
router.post("/:id", addAttendance);
router.delete("/:id", deleteAttendance);

module.exports.attendance = router;
