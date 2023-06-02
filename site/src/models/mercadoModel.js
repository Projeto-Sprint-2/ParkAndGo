var database = require("../database/config")
var endereco = require("./enderecoModel")

function listar() {
    return database.executar(`
    SELECT * FROM Mercado m JOIN Endereco e
        ON m.fkEndereco = e.idEndereco;
    `);
}

async function cadastrar(nome, cnpj, unidade, fkEmpresa, logradouro, bairro, cidade, estado, numero, cep) {
    var insertEndereco = await endereco.cadastrar(logradouro, bairro, cidade, estado, numero, cep)

    return database.executar(`INSERT INTO Mercado values (null, '${nome}', '${cnpj}', '${unidade}', ${fkEmpresa}, ${insertEndereco.insertId});`)

}

module.exports = {
    cadastrar,
    listar,
};