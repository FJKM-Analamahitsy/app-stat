const express = require("express");
const { authMiddlware } = require("../controllers/middleware");
const {
  updateProfile,
  createProfile,
  deleteProfile,
  getAllProfile,
  getProfile,
} = require("../controllers/profile.controller");

const route = express.Router();

route.get("/", authMiddlware, getAllProfile);
route.get("/:id", authMiddlware, getProfile);
route.post("/", authMiddlware, createProfile);
route.patch("/:id", authMiddlware, updateProfile);
route.delete("/:id", authMiddlware, deleteProfile);

module.exports.profile = route;
