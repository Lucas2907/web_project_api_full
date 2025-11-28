const express = require("express");

const {
  getCards,
  createCards,
  deleteCard,
  likeCard,
  deleteLike,
} = require("../controllers/cards");
const {
  validateCreateCard,
  validateCardId,
} = require("../middlewares/validation");

const router = express.Router();

router.get("/", getCards);

router.post("/", validateCreateCard, createCards);

router.delete("/:id", validateCardId, deleteCard);

router.put("/:cardId/likes", validateCardId, likeCard);

router.delete("/:cardId/likes", validateCardId, deleteLike);

module.exports = router;
