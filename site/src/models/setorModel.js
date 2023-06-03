var database = require("../database/config");

function cadastrar(nome, andar, capacidadeMaxima, fkMercado){
    return database.executar(`
    INSERT INTO Setor values
        (null, '${nome}', '${andar}', ${capacidadeMaxima}, ${fkMercado})
    `)
}

function listar(idMercado) {
    return database.executar(`SELECT * FROM Setor where fkMercado = ${idMercado};`);
}

function listarSetor(idSetor){
    return database.executar(`
    SELECT * FROM Setor s 
        JOIN Mercado m
            ON s.fkMercado = m.idMercado
                WHERE idSetor = ${idSetor};
    `);
}

module.exports = {
    cadastrar,
    listar,
    listarSetor
}