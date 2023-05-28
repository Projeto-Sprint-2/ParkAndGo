var database = require("../database/config")

function cadastrar(nome, sobrenome, cpf, email, telefone, fkEmpresa){
    return database.executar(`
        INSERT INTO Responsavel values
        (null, '${nome}', '${sobrenome}', '${cpf}', '${email}', '${telefone}', now(), ${fkEmpresa})
    `)
}

module.exports = {
    cadastrar
}