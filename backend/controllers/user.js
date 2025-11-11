/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
const User = require("../models/users");

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error("Nenhum usuário encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      const status = err.statusCode || 500;
      const message =
        status === 404 ? "Nenhum usuário encontrado" : "Erro do servidor";
      return res.status(status).send({ message });
    });
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const error = new Error("Nenhum usuário com esse Id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID inválido" });
      }
      const status = err.statusCode || 500;
      const message =
        status === 404
          ? "Nenhum usuário foi encontrado com esse id"
          : "Erro no servidor";
      return res.status(status).send({ message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "A sua requisição não corresponde aos padrões estabelecidos",
        });
      }
      return res.status(500).send({ message: "Erro interno do servidor", err });
    });
};

module.exports.updateProfile = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("Erro ao atualizar Perfil");
      error.statusCode = 404;
      throw error;
    })
    .then(() => {
      res.status(200).send({ message: "Perfil atualizado com sucesso" });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "A sua requisição não corresponde aos padrões estabelecidos",
        });
      }
      const status = err.statusCode || 500;
      const message =
        status === 404
          ? "Usuário não encontrado"
          : "Erro desconhecido do servidor";
      return res.status(status).send({ message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error("Erro ao atualizar avatar");
      error.statusCode = 404;
      throw error;
    })
    .then(() => {
      res.status(200).send({ message: "Avatar alterado com sucesso" });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "A sua requisição não corresponde aos padrões estabelecidos",
        });
      }
      const status = err.statusCode || 500;
      const message =
        status === 404
          ? "Usuário não encontrado"
          : "Erro desconhecido do servidor";
      return res.status(status).send({ message });
    });
};
