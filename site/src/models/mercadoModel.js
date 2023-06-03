var database = require("../database/config")
var endereco = require("./enderecoModel")

function listar(idEmpresa) {
    return database.executar(`
    SELECT *, DATE_FORMAT(dataCadastro, '%d/%m/%Y - %H:%i:%s') as data FROM Mercado m JOIN Endereco e
        ON m.fkEndereco = e.idEndereco
            where fkEmpresa = ${idEmpresa};

    `);
}

async function cadastrar(nome, cnpj, unidade, fkEmpresa, logradouro, bairro, cidade, estado, numero, cep) {
    var insertEndereco = await endereco.cadastrar(logradouro, bairro, cidade, estado, numero, cep)
    return database.executar(`INSERT INTO Mercado values (null, '${nome}', '${cnpj}', '${unidade}', now(), ${fkEmpresa}, ${insertEndereco.insertId});`)
}

module.exports = {
    cadastrar,
    listar,
};