var database = require("../database/config");

function cadastrar(nome, andar, capacidadeMaxima, fkMercado){
    return database.executar(`
    INSERT INTO Setor values
        (null, '${nome}', '${andar}', ${capacidadeMaxima}, ${fkMercado})
    `)
}

function listar() {
    return database.executar(`SELECT * FROM Setor;`);
}

function listarSetor(idSetor){
    return database.executar(`
    SELECT * FROM Setor s 
        JOIN Mercado m
            ON s.fkMercado = m.idMercado
                WJERE idSetor = ${idSetor};
    `);
}

module.exports = {
    cadastrar,
    listar,
    listarSetor
}