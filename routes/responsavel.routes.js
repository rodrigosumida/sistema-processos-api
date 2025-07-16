const express = require("express");
const router = express.Router();

const controller = require("../controllers/responsavel.controller");
const itemcontroller = new controller();

// const loginRequired = require("../middlewares/loginRequired");

router.post(
  "/",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Criação de uma nova responsável'
  itemcontroller.create
);

router.get(
  "/",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Listagem de todos os responsáveis'
  itemcontroller.list
);

router.get(
  "/:id",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Busca de responsável por ID'
  itemcontroller.search
);

router.put(
  "/:id",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Atualização de um responsável'
  itemcontroller.update
);

router.delete(
  "/:id",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Exclusão de um responsável'
  itemcontroller.delete
);

router.get(
  "/test",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Rota de teste de responsável (sem autenticação)'
  itemcontroller.test
);

module.exports = router;
