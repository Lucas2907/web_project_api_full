const Card = require("../models/cards");

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error("Nenhum Card Encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      const status = err.statusCode || 500;
      const message =
        status === 404 ? "Nenhum Card Encontrado" : "Erro do Servidor";
      return res.status(status).send({ message });
    });
};

module.exports.createCards = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "A sua requisição não corresponde aos padrões estabelecidos",
        });
      }
      return res
        .status(500)
        .send({ message: "Erro Desconhecido encontrado", err });
    });
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findById(id).then((card) => {
    if (!card) {
      return res.send({ message: "Card não existe" });
    }
    if (card.owner.toString() !== req.user._id) {
      return res.send({ message: "você nao tem autorização" });
    }
    return Card.findByIdAndDelete(id)
      .then(() => res.send({ message: "Card deletado com sucesso!" }))
      .catch((err) => res.send({ message: err.message }));
  });
};

module.exports.likeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID inválido" });
      }
      return res.status(500).send({ message: "Erro interno do servidor" });
    });
};

module.exports.deleteLike = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID inválido" });
      }
      return res.status(500).send({ message: "Erro interno do servidor" });
    });
};
