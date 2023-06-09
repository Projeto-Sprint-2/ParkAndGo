var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idSensor = req.params.idSensor;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idSensor, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idSensor = req.params.idSensor;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idSensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasPorSetor(req, res) {
    var idMercado = req.params.idMercado
    medidaModel.buscarMedidasPorSetor(idMercado).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarOcupacaoGeral(req, res) {
    idMercado = req.params.idMercado
    medidaModel.buscarOcupacaoGeral(idMercado).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(204).send('Nenhum resultado encontrado')
        }
    }).catch(function (erro) {
        console.log(erro)
        console.log("Houve um erro ao buscar a ocupacao geral.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarOcupacaoSetor(req, res) {
    idMercado = req.params.idMercado
    idSetor = req.params.idSetor
    medidaModel.buscarOcupacaoSetor(idSetor, idMercado).then(resultado => {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(204).send('Nenhum resultado encontrado')
        }
    }).catch(function (erro) {
        console.log(erro)
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasPorSetor,
    buscarOcupacaoGeral,
    buscarOcupacaoSetor
}