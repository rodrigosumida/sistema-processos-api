const express = require("express");
const router = express.Router();

const controller = require("../controllers/area-cargo-responsavel.controller");
const itemcontroller = new controller();

// const loginRequired = require("../middlewares/loginRequired");

router.post(
  "/",
  // #swagger.tags = ['Area - Cargo - Responsavel']
  // #swagger.description = 'Criação de uma nova associação Area - Cargo - Responsavel'
  itemcontroller.create
);

router.post(
  "/grouped",
  // #swagger.tags = ['Area - Cargo - Responsavel']
  // #swagger.description = 'Criação de uma nova associação Area - Cargo - Responsavel (formato "nome" e "cargos")'
  itemcontroller.createFromGrouped
);

router.get(
  "/",
  // #swagger.tags = ['Area - Cargo - Responsavel']
  // #swagger.description = 'Listagem de todas as associações Area - Cargo - Responsavel'
  itemcontroller.list
);

router.get(
  "/group-area",
  // #swagger.tags = ['Area - Cargo - Responsavel']
  // #swagger.description = 'Listagem de todas as associações Area - Cargo - Responsavel agrupadas por área'
  itemcontroller.listGroupArea
);

router.get(
  "/group-area/:area",
  // #swagger.tags = ['Area - Cargo - Responsavel']
  // #swagger.description = 'Listagem de todas as associações Area - Cargo - Responsavel agrupadas por área ('
  itemcontroller.listGroupAreaByAreaId
);

router.get(
  "/:id",
  // #swagger.tags = ['Area - Cargo - Responsavel']
  // #swagger.description = 'Busca de associação Area - Cargo - Responsavel por ID'
  itemcontroller.search
);

router.get(
  "/area/:area",
  // #swagger.tags = ['Area - Cargo - Responsavel']
  // #swagger.description = 'Busca de associação Area - Cargo - Responsavel por ID'
  itemcontroller.searchArea
);

router.put(
  "/:id",
  // #swagger.tags = ['Area - Cargo - Responsavel']
  // #swagger.description = 'Atualização de uma associação Area - Cargo - Responsavel'
  itemcontroller.update
);

router.put(
  "/grouped/:id",
  // #swagger.tags = ['Area - Cargo - Responsavel']
  // #swagger.description = 'Atualização de uma associação Area - Cargo - Responsavel (formato "id", "nome" e "cargos")'
  itemcontroller.updateGrouped
);

router.delete(
  "/:id",
  // #swagger.tags = ['Area - Cargo - Responsavel']
  // #swagger.description = 'Exclusão de uma associação Area - Cargo - Responsavel'
  itemcontroller.delete
);

router.delete(
  "/delete-grouped/:id",
  // #swagger.tags = ['Area - Cargo - Responsavel']
  // #swagger.description = 'Exclusão de uma associação Area - Cargo - Responsavel e retorna as instâncias restantes da área'
  itemcontroller.deleteAndReturnGroupedArea
);

router.get(
  "/test",
  // #swagger.tags = ['Area - Cargo - Responsavel']
  // #swagger.description = 'Rota de teste de associação Area - Cargo - Responsavel (sem autenticação)'
  itemcontroller.test
);

module.exports = router;
