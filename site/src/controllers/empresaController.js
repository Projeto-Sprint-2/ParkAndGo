var empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
    var razaoSocial = req.body.razaoSocialServer
    var nomeFantasia = req.body.nomeFantasiaServer
    var cnpj = req.body.cnpjServer
    var cep = req.body.cepServer
    var logradouro = req.body.logradouroServer
    var numero = req.body.numeroServer
    var bairro = req.body.bairroServer
    var cidade = req.body.cidadeServer
    var estado = req.body.estadoServer

    empresaModel.cadastrar(razaoSocial, nomeFantasia, cnpj, cep, logradouro, numero, bairro, cidade, estado)
        .then(resultado => {
            res.json(resultado)
        }).catch(erro => {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

module.exports = {
    cadastrar
}