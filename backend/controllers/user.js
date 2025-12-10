const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require("../models/users");
const NotFoundError = require("../errors/not-found-err");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFoundError("Nenhum Usuário encontrado");
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        email,
        password: hash,
      });
    })
    .then(() => {
      res.status(201).send({ message: "Usuário criado com suceso" });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Erro ao encontrar perfil solicitado");
      }
      return res.status(200).send({ message: "Perfil atualizado com sucesso" });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Erro ao encontrar avatar solicitado");
      }
      return res.status(200).send({ message: "Avatar alterado com sucesso" });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { password, email } = req.body;
  return User.findUserByCredential(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );
      return res.send({ token });
    })
    .catch(next);
};


module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Usuário não encontrado");
      }
      return res.send({ data: user });
    })
    .catch(next);
};
