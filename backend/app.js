const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

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
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("error", err));

const { PORT = 3000 } = process.env;

const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const { login, createUser } = require("./controllers/user");

app.use(express.json());

app.use(cors());

app.post("/signin", validateLogin, login);

app.post("/signup", validateCreateUser, createUser);

app.use("/cards", auth, cardRoutes);

app.use("/users", auth, userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endereço não encontrado" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
