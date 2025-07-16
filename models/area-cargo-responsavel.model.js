const mongoose = require("../database");
const Schema = mongoose.Schema;

let AreaCargoRespSchema = new Schema({
  area: { type: Schema.Types.ObjectId, ref: "Area", required: true },
  cargo: { type: Schema.Types.ObjectId, ref: "Cargo", required: true },
  responsavel: {
    type: Schema.Types.ObjectId,
    ref: "Responsavel",
    required: true,
  },
});

module.exports = mongoose.model(
  "AreaCargoResp",
  AreaCargoRespSchema,
  "area-cargo-responsavel"
);
