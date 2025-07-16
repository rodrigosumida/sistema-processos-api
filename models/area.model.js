const mongoose = require("../database");
const Schema = mongoose.Schema;

let AreaSchema = new Schema({
  nome: { type: String, required: true },
});

module.exports = mongoose.model("Area", AreaSchema, "area");
