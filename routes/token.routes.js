const express = require("express");
const router = express.Router();

const controller = require("../controllers/token.controller");
const itemcontroller = new controller();

router.post(
  "/insert",
  // #swagger.tags = ['Token']
  // #swagger.description = 'Insere ou atualiza o token JWT'
  itemcontroller.insert_token
);

module.exports = router;
