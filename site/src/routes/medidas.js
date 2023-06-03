var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idSensor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idSensor", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get('/setores/ocupacao/:idMercado', (req, res) => {
    medidaController.buscarMedidasPorSetor(req, res)
})

router.get('/ocupacaoGeral/:idMercado', (req, res) => {
    medidaController.buscarOcupacaoGeral(req, res)
})

router.get('/ocupacao/:idSetor/:idMercado', (req, res) => {
    medidaController.buscarOcupacaoSetor(req, res)
})

module.exports = router;