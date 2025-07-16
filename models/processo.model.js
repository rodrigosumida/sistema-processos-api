const mongoose = require("../database");
const Schema = mongoose.Schema;

let ProcessoSchema = new Schema({
  area: { type: Schema.Types.ObjectId, ref: "Area", required: true },
  processo: { type: String, required: true },
  categoria: { type: String, required: true },
  gestao: { type: Number, required: true },
  inovacao: { type: Number, required: true },
  analise: { type: Number, required: true },
  sistematizacao: { type: Number, required: true },
  auxilio: { type: Number, required: true },
  estruturaCargos: [
    {
      type: Schema.Types.ObjectId,
      ref: "AreaCargoResponsavel",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Processo", ProcessoSchema, "processo");
