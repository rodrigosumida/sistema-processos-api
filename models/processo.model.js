const mongoose = require("../database");
const Schema = mongoose.Schema;

let ProcessoSchema = new Schema({
  area: { type: Schema.Types.ObjectId, ref: "Area", required: true },
  processo: { type: String, required: true },
  categoria: { type: String, required: true },
  gestao: { type: Boolean, required: true },
  inovacao: { type: Boolean, required: true },
  analise: { type: Boolean, required: true },
  sistematizacao: { type: Boolean, required: true },
  auxilio: { type: Boolean, required: true },
  estruturaCargos: [
    {
      type: Schema.Types.ObjectId,
      ref: "AreaCargoResp",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Processo", ProcessoSchema, "processo");
