const express = require("express");
const {
  getUsers,
  updateProfile,
  updateAvatar,
  getUserById,
  getCurrentUser,
} = require("../controllers/user");

const router = express.Router();

router.get("/", getUsers);
// router.get("/:id", getUserById);
router.get("/me", getCurrentUser);
router.patch("/me", updateProfile);
router.patch("/me/avatar", updateAvatar);

module.exports = router;
