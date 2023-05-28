var responsavelModel = require("../models/responsavelModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer
    var sobrenome = req.body.sobrenomeServer
    var cpf = req.body.cpfServer
    var email = req.body.emailServer
    var telefone = req.body.telefoneServer
    var fkEmpresa = req.body.fkEmpresaServer

    responsavelModel.cadastrar(nome, sobrenome, cpf, email, telefone, fkEmpresa)
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