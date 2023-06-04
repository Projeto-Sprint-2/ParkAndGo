var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");


router.get("/listar", function (req, res) {
    alertaController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    alertaController.listarPorUsuario(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    alertaController.publicar(req, res);
});

module.exports = router;