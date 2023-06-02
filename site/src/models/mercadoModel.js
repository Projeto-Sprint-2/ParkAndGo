var database = require("../database/config")
var endereco = require("./enderecoModel")

function listar() {
    return database.executar(`
    SELECT * FROM Mercado m JOIN Endereco e
        ON m.fkEndereco = e.idEndereco;
    `);
}

function cadastrar(nome, cnpj, unidade, fkEmpresa, logradouro, bairro, cidade, estado, numero, cep){
    endereco.cadastrar(logradouro, bairro, cidade, estado, numero, cep)
    database.executar(`SET @fkEndereco = LAST_INSERT_ID();`)
    return database.executar(`INSERT INTO Mercado values (null, '${nome}', '${cnpj}', '${unidade}', ${fkEmpresa}, @fkEndereco)`)
}

module.exports = {
    cadastrar,
    listar,
};