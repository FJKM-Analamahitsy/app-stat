const express = require("express");
const { authMiddlware } = require("../controllers/middleware");
const {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", authMiddlware, getAllUser);
router.post("/", authMiddlware, createUser);
router.patch("/:id", authMiddlware, updateUser);
router.delete("/:id", authMiddlware, deleteUser);

module.exports.users = router;
