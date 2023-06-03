var express = require("express");
var router = express.Router();

var setorController = require("../controllers/setorController");

router.get("/listar/:idMercado", function (req, res) {
    setorController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
    setorController.cadastrar(req, res);
})

router.get("/listar/setor/:idSetor", function (req, res) {
    setorController.listarSetor(req, res);
})

module.exports = router;