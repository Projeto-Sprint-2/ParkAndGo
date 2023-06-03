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

function deletarMercado(idMercado) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idMercado);
    var instrucao = `
        DELETE FROM mercado WHERE idMercado = ${idMercado};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listar,
    deletarMercado
};