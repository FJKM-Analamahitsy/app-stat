const express = require("express");
const {
  statistics,
  statPerBirthMonth,
  statPerSampana,
  offeringStatus,
} = require("../controllers/stat.controller");

const router = express.Router();

router.get("/", statistics);
router.get("/perbirth", statPerBirthMonth);
router.get("/pergroup", statPerSampana);
router.get("/offering", offeringStatus);

module.exports.stat = router;
