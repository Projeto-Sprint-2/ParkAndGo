var database = require("../database/config");

function listar() {
    var instrucao = `
        SELECT * FROM Alerta;
    `;
    return database.executar(instrucao);
}

function listarAlertaMercado(fkMercado, maxResultados) {
    
    var instrucao = `
        SELECT * FROM Alerta a WHERE fkMercado = ${fkMercado}
                limit ${maxResultados};
    `;
    return database.executar(instrucao);
}

function publicar(titulo, descricao, fkMercado) {
    var instrucao = `
        INSERT INTO Alerta VALUES (null, '${titulo}', '${descricao}', now(), ${fkMercado});
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarAlertaMercado,
    publicar,
}
