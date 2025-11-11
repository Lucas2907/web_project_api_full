const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("error", err));

const { PORT = 3000 } = process.env;

const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "68a450f8f27c95eb3afe0dce",
  };

  next();
});

app.use("/cards", cardRoutes);

app.use("/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endereço não encontrado" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
