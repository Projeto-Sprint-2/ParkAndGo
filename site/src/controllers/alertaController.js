var alertaModel = require("../models/alertaModel");

function listar(req, res) {
    alertaModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarAlertaMercado(req, res) {
    var fkMercado = req.params.fkMercado;
    var maxResultados = req.params.maxResultados;

    alertaModel.listarAlertaMercado(fkMercado, maxResultados)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function publicar(req, res) {
    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;
    var fkMercado = req.body.fkMercadoServer;

    if (titulo == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (descricao == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (fkMercado == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        alertaModel.publicar(titulo, descricao, fkMercado)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    listarAlertaMercado,
    publicar,
    listar
}