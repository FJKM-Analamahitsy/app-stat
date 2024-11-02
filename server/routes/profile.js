const express = require("express");
const { authMiddlware } = require("../controllers/middleware");
const {
  updateProfile,
  createProfile,
  deleteProfile,
} = require("../controllers/profile.controller");

const route = express.Router();

route.post("/", authMiddlware, createProfile);
route.patch("/:id", authMiddlware, updateProfile);
route.delete("/:id", authMiddlware, deleteProfile);

module.exports.profile = route;
