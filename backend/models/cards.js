const mongoose = require("mongoose");
const cardSchema = require("../schemas/card");

module.exports = mongoose.model("card", cardSchema);
