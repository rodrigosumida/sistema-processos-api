const express = require("express");
const router = express.Router();

const controller = require("../controllers/area.controller");
const itemcontroller = new controller();

// const loginRequired = require("../middlewares/loginRequired");

router.post(
  "/",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Criação de uma nova área'
  itemcontroller.create
);

router.get(
  "/",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Listagem de todas as áreas'
  itemcontroller.list
);

router.get(
  "/:id",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Busca de área por ID'
  itemcontroller.search
);

router.put(
  "/:id",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Atualização de uma área'
  itemcontroller.update
);

router.delete(
  "/:id",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Exclusão de uma área'
  itemcontroller.delete
);

router.get(
  "/test",
  // #swagger.tags = ['Cargo']
  // #swagger.description = 'Rota de teste de área (sem autenticação)'
  itemcontroller.test
);

module.exports = router;
