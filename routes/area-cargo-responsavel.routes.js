const express = require("express");
const router = express.Router();

const controller = require("../controllers/area-cargo-responsavel.controller");
const itemcontroller = new controller();

// const loginRequired = require("../middlewares/loginRequired");

router.post(
  "/",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Criação de uma nova associação Area - Cargo - Responsavel'
  itemcontroller.create
);

router.get(
  "/",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Listagem de todas as associações Area - Cargo - Responsavel'
  itemcontroller.list
);

router.get(
  "/:id",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Busca de associação Area - Cargo - Responsavel por ID'
  itemcontroller.search
);

router.put(
  "/:id",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Atualização de uma associação Area - Cargo - Responsavel'
  itemcontroller.update
);

router.delete(
  "/:id",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Exclusão de uma associação Area - Cargo - Responsavel'
  itemcontroller.delete
);

router.get(
  "/test",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Rota de teste de associação Area - Cargo - Responsavel (sem autenticação)'
  itemcontroller.test
);

module.exports = router;
