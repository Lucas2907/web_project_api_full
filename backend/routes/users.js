const express = require("express");
const {
  getUsers,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/user");
const {
  validateUpdateProfile,
  validateUpdateAvatar,
} = require("../middlewares/validation");

const router = express.Router();

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me", validateUpdateProfile, updateProfile);
router.patch("/me/avatar", validateUpdateAvatar, updateAvatar);

module.exports = router;
