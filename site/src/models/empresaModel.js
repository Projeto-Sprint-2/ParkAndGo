var database = require("../database/config")
var endereco = require("./enderecoModel")

function listar() {
    return database.executar(`
        select * from Empresa;
    `)
}

async function cadastrar(razaoSocial, nomeFantasia, cnpj, cep, logradouro, numero, bairro, cidade, estado) {
    var insertEndereco = await endereco.cadastrar(logradouro, bairro, cidade, estado, numero, cep)

    return database.executar(`INSERT INTO Empresa values (null, '${cnpj}', '${razaoSocial}', '${nomeFantasia}', now(), ${insertEndereco.insertId});`)
}

module.exports = {
    cadastrar,
    listar
}