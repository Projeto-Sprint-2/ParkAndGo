var setorModel = require("../models/setorModel");

function listar(req, res) {
    setorModel.listar()
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
        )
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var andar = req.body.andarServer;
    var capacidadeMaxima = req.body.capacidadeMaximaServer;
    var fkMercado = req.body.fkMercadoServer;

    setorModel.cadastrar(nome, andar, capacidadeMaxima, fkMercado)
        .then(resultado => {
            res.json(resultado);
        }).catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
        );
}

function listarSetor(req,res){
    var idSetor = req.params.idSetor;

    setorModel.listarSetor(idSetor)
    .then(resultado=>{
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(erro=>{
        console.log(erro)
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    cadastrar,
    listar,
    listarSetor
}