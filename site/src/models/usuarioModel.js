var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM Usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    var instrucao = `
        SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, email, senha, fkEmpresa, fkMercado, fkTipoUsuario) {
    var instrucao = `
        INSERT INTO Usuario (nome, email, senha, fkEmpresa, fkMercado, fkTipoUsuario) VALUES ('${nome}', '${email}', '${senha}',  ${fkEmpresa}, ${fkMercado}, ${fkTipoUsuario});
    `;
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
};