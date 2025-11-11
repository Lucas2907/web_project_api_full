/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
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

module.exports.deleteCards = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndDelete(id)
    .orFail(() => {
      const error = new Error("Nenhum Cartão encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then(() => {
      res.status(204).send({ message: "Card deletado com sucesso" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID inválido" });
      }

      const status = err.statusCode || 500;
      const message =
        status === 404 ? "Nenhum card foi encontrado " : "Erro no servidor";
      return res.status(status).send({ message, err });
    });
};

module.exports.likeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then(() => {
      res.status(200).send({ message: "Card curtido com sucesso" });
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
    .then(() => {
      res.status(200).send({ message: "Like deletado com sucesso" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID inválido" });
      }
      return res.status(500).send({ message: "Erro interno do servidor" });
    });
};
