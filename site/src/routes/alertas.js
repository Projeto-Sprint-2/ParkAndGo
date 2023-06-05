var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");


router.get("/listar", function (req, res) {
    alertaController.listar(req, res);
});

router.get("/listar/:fkMercado/:maxResultados", function (req, res) {
    alertaController.listarAlertaMercado(req, res);
});

router.post("/publicar/", function (req, res) {
    alertaController.publicar(req, res);
});

module.exports = router;