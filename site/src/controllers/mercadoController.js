var mercadoModel = require("../models/mercadoModel");

function cadastrar(req,res){
    var nome = req.body.nomeServer
    var cnpj = req.body.cnpjServer
    var unidade = req.body.unidadeServer
    var fkEmpresa = req.body.fkEmpresa
    var cep = req.body.cepServer
    var logradouro = req.body.logradouroServer
    var numero = req.body.numeroServer
    var bairro = req.body.bairroServer
    var cidade = req.body.cidadeServer
    var estado = req.body.estadoServer

    mercadoModel.cadastrar(nome, cnpj, unidade, fkEmpresa, logradouro, bairro, cidade, estado, numero, cep)
    .then(resultado=>{
        res.json(resultado)
    }).catch(erro=>{
        console.log(erro)
        res.status(500).json(erro.sqlMessage)
    })
}

module.exports = {
    cadastrar
}