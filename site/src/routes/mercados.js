var express = require("express");
var router = express.Router();

var mercadoController = require("../controllers/mercadoController");

router.post("/cadastrar", function (req, res) {
    mercadoController.cadastrar(req, res);
})

router.get("/listar", function (req, res) {
    mercadoController.listar(req, res);
})

module.exports = router;