const mongoose = require("../database");
const Schema = mongoose.Schema;

let CargoSchema = new Schema({
  nome: { type: String, required: true },
});

module.exports = mongoose.model("Cargo", CargoSchema, "cargo");
