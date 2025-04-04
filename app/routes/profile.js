const express = require("express");
const {
  updateProfile,
  createProfile,
  deleteProfile,
  getAllProfile,
  getProfile,
} = require("../controllers/profile.controller");

const route = express.Router();

route.get("/", getAllProfile);
route.get("/:id", getProfile);
route.post("/", createProfile);
route.patch("/:id", updateProfile);
route.delete("/:id", deleteProfile);

module.exports.profile = route;
