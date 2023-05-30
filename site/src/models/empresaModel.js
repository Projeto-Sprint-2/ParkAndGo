var database = require("../database/config")
var endereco = require("./enderecoModel")

function listar() {
    return database.executar(`
        select * from Empresa;
    `)
}

function cadastrar(razaoSocial, nomeFantasia, cnpj, cep, logradouro, numero, bairro, cidade, estado) {
    endereco.cadastrar(logradouro, bairro, cidade, estado, numero, cep)
    database.executar(`SET @fkEndereco = LAST_INSERT_ID();`)
    return database.executar(`INSERT INTO Empresa values (null, '${cnpj}', '${razaoSocial}', '${nomeFantasia}', now(), @fkEndereco);`)
}

module.exports = {
    cadastrar,
    listar
}