const express = require("express");
const router = express.Router();

const controller = require("../controllers/cargo.controller");
const itemcontroller = new controller();

// const loginRequired = require("../middlewares/loginRequired");

router.post(
  "/",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Criação de um novo cargo'
  itemcontroller.create
);

router.get(
  "/",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Listagem de todas os cargos'
  itemcontroller.list
);

router.get(
  "/:id",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Busca de cargo por ID'
  itemcontroller.search
);

router.put(
  "/:id",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Atualização de um cargo'
  itemcontroller.update
);

router.delete(
  "/:id",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Exclusão de um cargo'
  itemcontroller.delete
);

router.get(
  "/test",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Rota de teste de cargo (sem autenticação)'
  itemcontroller.test
);

module.exports = router;
