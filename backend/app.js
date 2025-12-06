const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const {
  validateCreateUser,
  validateLogin,
  validateCreateCard,
  validateCardId,
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require("./middlewares/validation");
const auth = require("./middlewares/auth");

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("error", err));

const { PORT = 3000 } = process.env;

const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const { login, createUser } = require("./controllers/user");

app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("O servidor travará agora");
  }, 0);
});

app.post("/signin", validateLogin, login);

app.post("/signup", validateCreateUser, createUser);

app.use(auth);

app.use("/cards", cardRoutes);

app.use("/users", userRoutes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode);
  res.send({
    message: statusCode === 500 ? "Ocorreu um erro no servidor" : message,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
