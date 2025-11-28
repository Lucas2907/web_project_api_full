const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const NotFoundError = require("../errors/not-found-err");
const UnathorizedError = require("../errors/unathorized-err");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: "Explorer",
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]+#?$/.test(
          v
        );
      },
      message: "URL inválida para o avatar",
    },
    required: false,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "E-mail inválido"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredential = function findUserByCredential(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then(async (user) => {
      if (!user) {
        throw new NotFoundError("E-mail ou senha incorretos");
      }
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        throw new UnathorizedError("E-mail ou senha incorretos");
      }
      return user;
    });
};

module.exports = userSchema;
