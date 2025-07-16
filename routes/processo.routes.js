const express = require("express");
const router = express.Router();

const controller = require("../controllers/processo.controller");
const itemcontroller = new controller();

// const loginRequired = require("../middlewares/loginRequired");

router.post(
  "/",
  // #swagger.tags = ['Processos']
  // #swagger.description = 'Criação de um novo processo'
  itemcontroller.create
);

router.get(
  "/",
  // #swagger.tags = ['Processos']
  // #swagger.description = 'Listagem de todas os processos'
  itemcontroller.list
);

router.get(
  "/:id",
  // #swagger.tags = ['Processos']
  // #swagger.description = 'Busca de processo por ID'
  itemcontroller.search
);

router.put(
  "/:id",
  // #swagger.tags = ['Processos']
  // #swagger.description = 'Atualização de um processo'
  itemcontroller.update
);

router.delete(
  "/:id",
  // #swagger.tags = ['Processos']
  // #swagger.description = 'Exclusão de um processo'
  itemcontroller.delete
);

router.get(
  "/test",
  // #swagger.tags = ['Processos']
  // #swagger.description = 'Rota de teste de processo (sem autenticação)'
  itemcontroller.test
);

module.exports = router;
