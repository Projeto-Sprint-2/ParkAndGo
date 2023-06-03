var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idSensor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idSensor", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get('/setores/ocupacao', (req, res) => {
    medidaController.buscarMedidasPorSetor(req, res)
})

router.get('/ocupacaoGeral', (req, res) => {
    medidaController.buscarOcupacaoGeral(req, res)
})

router.post('/cadastrarDadosMocados', (req, res) => {
    medidaController.cadastroDadosMocados(req, res)
})

module.exports = router;