const UnathorizedError = require("../errors/unathorized-err");
const NotFoundError = require("../errors/not-found-err");
const Card = require("../models/cards");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      throw new NotFoundError("Nenhum Card encontrado");
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.createCards = (req, res, next) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .then(async (card) => {
      if (!card) {
        throw new NotFoundError("Card não existe");
      }
      if (card.owner.toString() !== req.user._id) {
        throw new UnathorizedError(
          "Autorização necessária para concluir processo solicitado"
        );
      }
      await Card.findByIdAndDelete(id).then(() => {
        return res.send({ message: "Card deletado com sucesso!" });
      });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const userId = req.user._id;
  Card.findById(req.params.cardId)
    .then(async (card) => {
      if (!card) {
        throw new NotFoundError("CardId não encontrado");
      }
      await Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: userId } },
        { new: true }
      ).then(() => {
        res.send({ message: "Card curtido com sucesso" });
      });
    })
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  const userId = req.user._id;
  Card.findById(req.params.cardId)
    .then(async (card) => {
      if (!card) {
        throw new NotFoundError("CardId não encontrado");
      }
      await Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: userId } },
        { new: true }
      ).then(() => {
        res.send({ message: "Card descurtido com sucesso" });
      });
    })
    .catch(next);
};
