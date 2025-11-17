const express = require("express");

const {
  getCards,
  createCards,
  deleteCard,
  likeCard,
  deleteLike,
} = require("../controllers/cards");

const router = express.Router();

router.get("/", getCards);

router.post("/", createCards);

router.delete("/:id", deleteCard);

router.put("/:cardId/likes", likeCard);

router.delete("/:cardId/likes", deleteLike);

module.exports = router;
