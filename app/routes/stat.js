const express = require("express");
const {
  statistics,
  statPerBirthMonth,
  statPerSampana,
} = require("../controllers/stat.controller");

const router = express.Router();

router.get("/", statistics);
router.get("/perbirth", statPerBirthMonth);
router.get("/pergroup", statPerSampana);

module.exports.stat = router;
