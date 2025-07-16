const mongoose = require("../database");
const Schema = mongoose.Schema;

let ResponsavelSchema = new Schema({
  nome: { type: String, required: true },
});

module.exports = mongoose.model(
  "Responsavel",
  ResponsavelSchema,
  "responsavel"
);
