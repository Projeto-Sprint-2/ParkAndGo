var database = require("../database/config")

function cadastrar(logradouro, bairro, cidade, estado, numero, cep){    
    return database.executar(`
        INSERT INTO Endereco values
        (null, '${logradouro}', '${bairro}', '${cidade}', '${estado}', '${numero}', '${cep}');
    `)
}

module.exports = {
    cadastrar
}